import type { Metadata, ResolvingMetadata } from "next"

export type BaseContent = {
  title: string
  description: string
  slug: string
  publishedAt?: string
  updatedAt?: string
  coverImage?: string
  thumbnail?: string | null;
}

export type ContentMetadata = {
  key: string
  value: string | string[]
}

export type Article = BaseContent & {
  type: "article"
  content: string
  meta: ContentMetadata[]
}

export type Infographic = BaseContent & {
  type: "infographic"
  imageUrl: string
  meta: ContentMetadata[]
}

export type Video = BaseContent & {
  type: "video"
  videoUrl: string
  meta: ContentMetadata[]
}

export type Content = Article | Infographic | Video

export function getMetadataValue(meta: ContentMetadata[] | null, key: string): string | string[] | null {
  if (!Array.isArray(meta) || meta.length === 0) return null;

  const entry = meta.find((item) => item.key === key);
  return entry ? entry.value : null;
}

export function formatKeywords(keywords: string | string[] | null): string {
  if (!keywords) return ""
  return Array.isArray(keywords) ? keywords.join(", ") : keywords
}

export async function formatMetadata<T extends Content>(
  content: T,
  options?: {
    baseUrl?: string
    siteName?: string
    defaultImage?: string
    defaultAuthor?: string
    parent?: ResolvingMetadata
  },
): Promise<Metadata> {
  const {
    baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL,
    siteName = "PEMKAB Muara Enim",
    defaultAuthor = "Admin Pemkab Muara Enim",
  } = options || {}

  const authorRaw = getMetadataValue(content.meta, "author")
  const author = typeof authorRaw === "string"
    ? authorRaw
    : Array.isArray(authorRaw)
      ? authorRaw.join(", ")
      : defaultAuthor
  const keywords = getMetadataValue(content.meta, "keywords")
  const formattedKeywords = formatKeywords(keywords)

  const canonicalUrl = `${baseUrl}/${content.type}s/${content.slug}`

  return {
    title: `${content.title || content.meta?.find((item) => item.key === "tittle")?.value || "Menu"} | ${siteName}`,
    description: `${content.description || content.meta?.find((item) => item.key === "description")?.value}` || "",
    authors: [{ name: author as string }],
    keywords: formattedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${content.title || content.meta?.find((item) => item.key === "tittle")?.value || "Menu"} | ${siteName}` || "",
      description: content.description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: content.thumbnail || options?.defaultImage || `${baseUrl}/default-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
      type: content.type === "article" ? "article" : "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [content.coverImage || (getMetadataValue(content.meta, "twitter:image") as string) || `${baseUrl}/default-twitter-image.jpg`],
      creator: author,
    },

  }
}
