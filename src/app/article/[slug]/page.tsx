import type { Metadata } from "next"
import ArticleService from "@/services/controlers/article/article.service"
import { formatMetadata } from "@/services/utils/generate-seo"
import ArticleDetailClient from "@/components/modul/article/detail"
import { PageProps } from "../../../../.next/types/app/article/[slug]/page"
import { ArticleData } from "@/services/controlers/article/type"

interface DynamicPageProps {
  params: { slug?: string };
}

let article: ArticleData;

export async function generateMetadata({ params }: DynamicPageProps & PageProps): Promise<Metadata> {
  const { slug } = await params || {};
  try {
    const articleResponse = await ArticleService.getOne(slug ?? '', { with: "user,category" })
     article = articleResponse.data

    return formatMetadata({ ...article, type: "article" }, { siteName: "Website Desa" })
  } catch {
    return {
      title: "Artikel | Website Desa",
      description: "Baca artikel terbaru kami",
    }
  }
}

export default async function ArticleDetailPage({ params }: DynamicPageProps & PageProps) {
 const {slug} = await params || {};
  return (
    <div className="min-h-screen px-3 md:px-12 w-full mt-16 py-4">
      <div className="absolute inset-0 h-[15%] bg-gradient-to-b from-black/25 to-white/5"></div>
      <ArticleDetailClient slug={slug} initialData={article}  />
    </div>
  )
}
