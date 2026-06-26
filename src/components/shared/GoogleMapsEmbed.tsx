"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import useGmapsSettings from "@/hooks/settings/useGmapsSettings";

interface GoogleMapsEmbedProps {
  latitude: string | number | null | undefined;
  longitude: string | number | null | undefined;
  mode?: "place" | "streetview";
  zoom?: number;
  title?: string;
  className?: string;
  iframeClassName?: string;
  fallbackClassName?: string;
}

function getDirectMapsUrl(
  latitude: string | number | null | undefined,
  longitude: string | number | null | undefined
): string | null {
  if (!latitude || !longitude) return null;
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export function GoogleMapsEmbed({
  latitude,
  longitude,
  mode = "place",
  zoom = 15,
  title = "Lokasi di Google Maps",
  className = "",
  iframeClassName = "",
  fallbackClassName = "",
}: GoogleMapsEmbedProps) {
  const { gmapsApiKey } = useGmapsSettings();
  const [hasError, setHasError] = useState(false);

  const hasCoordinates = !!latitude && !!longitude;
  const hasValidKey = !!gmapsApiKey && gmapsApiKey.trim().length > 0;
  const directMapsUrl = getDirectMapsUrl(latitude, longitude);

  useEffect(() => {
    if (!hasCoordinates || !hasValidKey) return;
    const img = new globalThis.Image();
    img.onload = () => {
      setHasError(false);
    };
    img.onerror = () => {
      setHasError(true);
    };
    img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=1&size=1x1&key=${gmapsApiKey}`;
  }, [gmapsApiKey, latitude, longitude, hasCoordinates, hasValidKey]);

  const embedUrl = hasCoordinates && hasValidKey
    ? mode === "streetview"
      ? `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${latitude},${longitude}&heading=0&pitch=0`
      : `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${latitude},${longitude}&zoom=${zoom}`
    : null;

  const handleIframeError = useCallback(() => {
    setHasError(true);
  }, []);

  const showFallback = !hasCoordinates || !hasValidKey || hasError;

  if (showFallback) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${fallbackClassName} ${className}`}
      >
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-4">
            <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Peta tidak dapat ditampilkan
          </p>
          {directMapsUrl && (
            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-700 hover:text-grey-800 hover:underline transition-colors"
            >
              Buka di Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl!}
      className={`border-0 ${iframeClassName} ${className}`}
      width="100%"
      height="100%"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      onError={handleIframeError}
    />
  );
}
