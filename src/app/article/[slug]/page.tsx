import type { Metadata } from "next";
import ArticleService from "@/services/controlers/article/article.service";
import { formatMetadata } from "@/services/utils/generate-seo";
import ArticleDetailClient from "@/components/modul/article/detail";
import { ArticleData } from "@/services/controlers/article/type";
import SettingService from "@/services/controlers/setting/setting.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import { validateAndRedirect } from "@/services/utils/shouldRedirect";
import { getArticle } from "@/hooks/contents/article/getArticle";

interface DynamicPageProps {
  params: { slug: string };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

let article: ArticleData;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const logoResponse = await SettingService.getSetting(
      `logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`
    );
    const articleResponse = await ArticleService.getOne(slug ?? "", {
      with: "user,category",
    });
    article = articleResponse.data;
    return formatMetadata(
      { ...article, type: "article" },
      {
        siteName:
          logoResponse?.data?.value?.regionEntity ||
          "Pemerintah Kabupaten Muara Enim",
      }
    );
  } catch {
    return {
      title: `Artikel | Pemerintah Kabupaten Muara Enim`,
    };
  }
}

export default async function ArticleDetailPage({
  params,
}: DynamicPageProps & PageProps) {
  const { slug } = await params;
  try {
    const article = await getArticle(slug);

    return (
      <div className="min-h-screen flex justify-center w-full mt-24 sm:mt-16 py-4">
        <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl z-10">
          <ArticleDetailClient initialData={article} />
        </div>
      </div>
    );
  } catch {
    if (validateAndRedirect([params.slug])) {
      return redirect("/article");
    }
    return (
      <div className="flex flex-col text-center items-center justify-center mt-24 sm:mt-16  h-96 w-full text-gray-700">
        <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }
}
