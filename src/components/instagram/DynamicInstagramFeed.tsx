"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useSetting from "@/hooks/settings/useSettings";
import useFeatureFlags from "@/hooks/settings/useFeatureFlags";

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string; // ISO 8601 format
  username?: string;
}

interface InstagramUser {
  id: string;
  username: string;
  account_type?: string;
  media_count?: number;
}

interface InstagramApiResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface InstagramFeedData {
  user: InstagramUser | null;
  media: InstagramMedia[];
}

interface InstagramTokenSetting {
  token: string;
  username?: string;
}

async function fetchInstagramUser(token: string): Promise<InstagramUser | null> {
  try {
    const fields = "id,username,account_type,media_count";
    const url = `https://graph.instagram.com/me?fields=${fields}&access_token=${token}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(
        `[InstagramFeed] User API response not OK: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data: InstagramUser = await response.json();
    return data || null;
  } catch (error) {
    console.warn("[InstagramFeed] Failed to fetch Instagram user:", error);
    return null;
  }
}

/**
 * Fetch Instagram media dari Graph API
 */
async function fetchInstagramMedia(token: string): Promise<InstagramMedia[] | null> {
  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username";
    const limit = 6;
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(
        `[InstagramFeed] API response not OK: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data: InstagramApiResponse = await response.json();
    return data.data || null;
  } catch (error) {
    console.warn("[InstagramFeed] Failed to fetch Instagram media:", error);
    return null;
  }
}

/**
 * Fetch both user info and media
 */
async function fetchInstagramData(token: string): Promise<InstagramFeedData | null> {
  try {
    const [user, media] = await Promise.all([
      fetchInstagramUser(token),
      fetchInstagramMedia(token),
    ]);

    if (!media) return null;

    return {
      user,
      media,
    };
  } catch (error) {
    console.warn("[InstagramFeed] Failed to fetch Instagram data:", error);
    return null;
  }
}

function formatDate(isoString: string | undefined): string {
  if (!isoString) return "";
  
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} minggu lalu`;
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function DynamicInstagramFeed() {
  const villageId = process.env.NEXT_PUBLIC_VILLAGE_ID;
  
  const { isSectionEnabled, isLoading: isFeaturesLoading } = useFeatureFlags();

  const {
    data: settingData,
    isLoading: isSettingLoading,
    isError: isSettingError,
  } = useSetting(`instagram-token-${villageId}`, {});

  const instagramSetting: InstagramTokenSetting | undefined = settingData?.value;
  const instagramToken = instagramSetting?.token;
  
  const isEnabled = isSectionEnabled("instagram") && !!instagramToken;

  const {
    data: instagramData,
    isLoading: isMediaLoading,
    isError: isMediaError,
  } = useQuery({
    queryKey: ["instagram-feed", instagramToken],
    queryFn: () => fetchInstagramData(instagramToken!),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  const instagramUser = instagramData?.user;
  const instagramMedia = instagramData?.media;
  const displayUsername = instagramUser?.username || instagramSetting?.username;

  if (isFeaturesLoading || isSettingLoading) return null;
  if (!isSectionEnabled("instagram")) return null;
  if (isSettingError || !instagramToken || instagramToken.trim() === "") return null;

  if (isMediaLoading) {
    return (
      <section id="instagram-feed" className="w-full flex justify-center py-12 md:py-16">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Instagram</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
                      <div className="h-2 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isMediaError || !instagramMedia || instagramMedia.length === 0) {
    return null;
  }

  return (
    <section id="instagram-feed" className="w-full flex justify-center py-12 md:py-16">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-800">Instagram</h2>
          </div>
          {displayUsername && (
            <Link
              href={`https://instagram.com/${displayUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              <InstagramIcon className="w-4 h-4" />
              @{displayUsername}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramMedia.map((media) => (
            <InstagramMediaItem 
              key={media.id} 
              media={media} 
              displayUsername={displayUsername}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramMediaItem({ 
  media, 
  displayUsername 
}: { 
  media: InstagramMedia;
  displayUsername?: string;
}) {
  const getImageUrl = (): string | null => {
    if (media.media_type === "VIDEO") {
      return media.thumbnail_url || media.media_url || null;
    }
    return media.media_url || null;
  };

  const imageUrl = getImageUrl();
  if (!imageUrl) return null;

  const truncateCaption = (text: string | undefined, maxLength: number = 100): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const formattedDate = formatDate(media.timestamp);

  return (
    <Link
      href={media.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={media.caption?.slice(0, 100) || "Instagram post"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {media.media_type === "VIDEO" && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <PlayIcon className="w-8 h-8 text-gray-800 ml-1" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          {formattedDate && (
            <span className="text-xs text-gray-400">
              {formattedDate}
            </span>
          )}
        </div>

        {media.caption ? (
          <p className="text-gray-700 text-sm leading-relaxed">
            {truncateCaption(media.caption, 100)}
          </p>
        ) : (
          <p className="text-gray-400 text-sm italic">Lihat di Instagram</p>
        )}
      </div>
    </Link>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
