"use client"

import useArticleDetail from "@/hooks/contents/article/useDetail"
import RichTextContent from "@/components/shared/RichTextContent"
import Image from "next/image"
import AsideContent from "@/components/app-layout/aside-content"
import Refetch from "@/components/shared/refetch"
import { ArticleData } from "@/services/controlers/article/type"
import { useState } from "react"

export default function ArticleDetailClient({ slug, initialData }: { slug: string, initialData: ArticleData }) {

  const [shouldFetch, setShouldFetch] = useState(!initialData || Object.keys(initialData).length === 0)  

  const {
    data: fetchedArticle,
    isLoading: isLoadingArticle,
    isFetching: isFetchingArticle,
    refetch: refetchArticle,
    isError: isErrorArticle,
  } = useArticleDetail({ 
    with: "user,category",
  }, slug, shouldFetch, initialData );

  const article = shouldFetch ? fetchedArticle : initialData;
  
  const handleRefresh = () => {
    setShouldFetch(true);
    refetchArticle();
  };

  const showLoading = isLoadingArticle && shouldFetch || Object.keys(article || {}).length === 0;
  const showError = isErrorArticle && !isFetchingArticle && shouldFetch;
  const showNoData = (!showError && !isFetchingArticle && !article);

  return (
    <AsideContent>
      {showLoading ? (
        <div className="flex flex-col my-2 gap-y-1 min-h-screen bg-white animate-pulse">
          <span className="self-start align-baseline h-4 w-32 bg-gray-200 rounded"></span>
          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
          <span className="self-start align-baseline h-4 w-40 bg-gray-200 rounded"></span>
          <span className="self-start align-baseline h-3 w-24 bg-gray-200 rounded"></span>
          <div className="relative w-full group mb-6">
            <div className="h-52 w-full flex-1 rounded-2xl"></div>
          </div>

          <div className="space-y-2 px-0 md:px-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>

          <div className="flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end">
            <div className="flex flex-row">
              <p className="h-4 w-32 bg-gray-200 rounded"></p>
            </div>
          </div>
        </div>
      ) : showNoData ? (
        <div className="flex w-full h-full justify-center">
          <div className="flex min-h-screen flex-col items-center justify-center gap-2">
            <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
          </div>
        </div>
      ) : showError ? (
        <div className="w-full h-full flex justify-center">
          <div className="flex min-h-screen flex-col items-center justify-center gap-2">
            <Refetch refetch={handleRefresh}/>
          </div>
        </div>
      ) : (
        <div className="flex flex-col my-2 gap-y-1 min-h-screen bg-white">
          <span className="self-star w-fit inline-block px-3 py-1 text-sm font-normal text-white bg-[#850000]/90 rounded-full">
            {article?.category?.name}
          </span>
          <h5 className="text-3xl md:text-4xl text-start font-bold tracking-tight text-gray-900 dark:text-white">
            {article?.title}
          </h5>
          <span className="self-start align-baseline text-base font-semibold text-black">{article?.user?.name}</span>
          <span className="self-start align-baseline text-sm font-medium text-gray-600">{article?.published_at}</span>
          <div className="relative w-full group mb-6 aspect-[16/9]">
            {article?.thumbnail && (
              <Image
                src={article.thumbnail || "/placeholder.svg"}
                alt="Article Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            )}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
          </div>
          <RichTextContent content={article?.content || ""} />
          <div className="flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end">
            <div className="flex flex-row">
              <p className="text-gray-500 dark:text-gray-400">
                Dilihat <strong className="font-semibold text-gray-900 dark:text-white">{article?.views}</strong> kali
              </p>
            </div>
          </div>
        </div>
      )}
    </AsideContent>
  )
}