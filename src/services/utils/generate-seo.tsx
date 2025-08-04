import type { Metadata, ResolvingMetadata } from "next"

export type BaseContent = {
  title: string
  description: string
  slug: string
  publishedAt?: string
  updatedAt?: string
  coverImage?: string
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
    defaultAuthor?: string
    parent?: ResolvingMetadata
  },
): Promise<Metadata> {
  const {
    baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL,
    siteName = "PEMKAB Muara Enim",
    defaultAuthor = "Admin Pemkab Muara Enim",
  } = options || {}

  const author = getMetadataValue(content.meta, "author") || defaultAuthor
  const keywords = getMetadataValue(content.meta, "keywords")
  const formattedKeywords = formatKeywords(keywords)

  const canonicalUrl = `${baseUrl}/${content.type}s/${content.slug}`
 
  return {
    title: `${content.title || content.meta.find((item) => item.key === "tittle")?.value} | ${siteName}`,
    description: `${content.description || content.meta.find((item) => item.key === "description")?.value}` || "Informasi terbaru dari Pemerintah Kabupaten Muara Enim",
    authors: [{ name: author as string }],
    keywords: formattedKeywords,
    alternates: {
      canonical: canonicalUrl,
    }
  }
}
