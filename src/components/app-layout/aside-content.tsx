"use client"

import type React from "react"
import useArticle from "@/hooks/contents/article/useList";
import Image from "next/image";
import Infografis from "../section/infografis";
import Link from "next/link";
import Refetch from "../shared/refetch";


export default function AsideContent({ children }: { children: React.ReactNode}) {

    const { data: articles, isLoading, isFetching, refetch, isError} = useArticle({"page_size": 4});

  return (
    <div className="flex flex-col items-stretch lg:flex-row w-full">
      <main className="flex-1 min-w-0">
        <div className="space-y-6">
          <div className="mb-8">
            {children}
          </div>
        </div>
      </main>
      <aside className="w-full lg:w-96 md:sticky md:top-0 md:self-start h-fit sm:p-4 border-gray-300 md:border-l">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#850000] mb-4 pb-2 border-gray-300 border-b">Artikel Populer</h2>
            <ul className="space-y-4">
              {
                isLoading ||  (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) && isFetching ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="flex animate-pulse">
                      <div className="mr-3 min-w-32 relative group mb-3">
                        <div className="w-40 md:w-30 rounded-sm shadow-lg bg-gray-200 h-20"></div>
                        <div className="absolute w-40 md:w-30 inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                      </div>
                    </li>
                ))
                ) : !isError && !isFetching && (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) ? (
                    <div className="flex min-h-52 mb-4 justify-center col-span-8 w-full">
                      <p className="text-black text-center text-md dark:text-gray-400">Artikel tidak tersedia</p>
                    </div>
                ) : isError && !isFetching  ? (
                    <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                      <Refetch  refetch={refetch} />
                    </div>
                ) : (
                  articles?.pages[0].data.map((article) => (
                    <Link key={article.id} href={`/article/${article.slug}`}>
                      <li className="flex py-1 border-b border-gray-100 last:border-0 group">
                        <div className="mr-3 flex-shrink-0 w-24 h-16 sm:w-28 sm:h-20">
                          <Image
                            className="w-full h-full rounded object-cover"
                            src={article.thumbnail || "/placeholder.svg?height=80&width=120"}
                            alt={article.title}
                            width={120}
                            height={80}
                            priority
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                          <h5 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 sm:line-clamp-3 group-hover:text-gray-600 transition-colors">
                            {article.title}
                          </h5>
                          <div className="flex items-center mt-1 text-xs">
                            <span className="text-red-600 font-medium">{article.category.name}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span className="text-gray-400">{article.published_at}</span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))
                )
               }
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#850000] mb-4 pb-2 border-gray-300 border-b">Infografis</h2>
            <div className="relative flex justify-center">
              <Infografis slideToShow={1}/>
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500 mb-2">ADVERTISEMENT</div>
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Ad Space</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
