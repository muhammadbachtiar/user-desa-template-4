'use client'

import { use, useState } from "react";
import Refetch from "@/components/shared/refetch";
import useTour from "@/hooks/contents/tour/useList";
import useInfografis from "@/hooks/contents/infografis/useInfografis";
import { Infografis } from "@/services/controlers/infografis/type";
import Link from "next/link";
import LightboxImage from "@/components/shared/Lightbox";
import useArticle from "@/hooks/contents/article/useList";

interface PageProps {
    params: Promise<{ search: string }>;
}
interface DynamicPageProps {
    params: { search?: string };
  }

export default function Home({ params }: DynamicPageProps & PageProps) {
    const unwrappedParams = use(params);
    const [searchValue, setSearchValue] = useState(unwrappedParams.search || '');

    const { data: articles, isLoading: IsArticleLoading, isFetching:IsArticleFetching, refetch:refetchArticle, isError:isArticleError} = useArticle({"search": searchValue, "page_size": 6});
    const { data: tour, isLoading: isTourLoading, isFetching: isTourFetching, refetch: refetchTour, isError: isTourError } = useTour({"search": searchValue});
    const { data: infografis, isLoading: isInfografisLoading, isFetching: isInfografisFetching, refetch: refetchInfografis, isError: isInfografisError } = useInfografis({"search": searchValue});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

  return (
      <div className="min-h-screen flex justify-center w-full">
        <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5"></div>
        <div className="mt-16 py-4 md:py-12 w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <div className="col-span-6 grid grid-cols-6 gap-x-4 gap-y-8">
                <div className="relative w-full col-span-6">
                    <input id="search-dropdown" type="search" value={searchValue} onChange={handleChange} className="block py-3 px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." />
                    <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-[#850000] dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </span>
                </div>
                <div className="relative w-full hidden md:block md:col-span-1">
                    <div className="px-4 pb-0 sticky top-4 text-gray-900 md:pb-4 dark:text-white">
                        <ul className="space-y-4 flex items-end flex-col" aria-labelledby="mega-menu-dropdown-button">
                            <li>
                                <a href="#article" className="text-gray-500 dark:text-gray-400 hover:text-[#850000] dark:hover:text-blue-500  w-full">
                                    Artikel
                                </a>
                            </li>
                            <li>
                                <a href="#infografis" className="text-gray-500 dark:text-gray-400 hover:text-[#850000] dark:hover:text-blue-500  w-full">
                                    Infografis
                                </a>
                            </li>
                            <li>
                                <a href="#wisata" className="text-gray-500 dark:text-gray-400 hover:text-[#850000] dark:hover:text-blue-500  w-full">
                                    Wisata
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="relative w-full col-span-6 grid grid-cols-6 gap-y-8 md:col-span-5 max-h-[80vh] overflow-y-auto">
                    <div className="col-span-6">
                        <div className="col-span-6">
                            <span id="article" className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Artikel</span>
                        </div>
                        <div className="col-span-6">
                            <hr className="h-px my-3 text-gray-400 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        </div>
                            <div className="col-span-6">  
                            <dl className="text-gray-900 divide-y divide-gray-100 dark:text-white dark:divide-gray-700">
                                { IsArticleLoading || (IsArticleFetching || (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0)) && isArticleError ? (
                                        Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                        key={index}
                                        className="flex flex-col py-3 animate-pulse bg-gray-50 hover:bg-gray-100"
                                        >
                                        <dd className="h-6 bg-gray-200 rounded w-3/4 mb-2"></dd>
                                        <dt className="h-4 bg-gray-200 rounded w-1/2"></dt>
                                        </div>
                                    ))
                                ) : !isArticleError && !IsArticleFetching && (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Artikel tidak ditemukan</p>
                                </div>
                                ) : isArticleError && !IsArticleFetching ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Refetch refetch={refetchArticle} />
                                </div>
                                ) : (
                                articles?.pages[0].data.map((article, index) => (
                                    <Link  key={article.id} href={`/article/${article.slug}`} tabIndex={1} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full">
                                                <div
                                                className={`flex flex-col py-3 ${
                                                    index % 2 === 0 ? 'bg-gray-50' : ''
                                                } hover:bg-gray-100 transition-colors duration-200`}
                                                >
                                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                                    <span className="block font-semibold text-gray-900">{article.title}</span>
                                                </dt>
                                                <dd className="text-mb text-gray-500 line-clamp-3 dark:text-white">
                                                    {article.description}
                                                </dd>
                                            </div>
                                    </Link>
                                ))
                                )}
                            </dl>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="col-span-6">
                            <span id="infografis" className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Infografis</span>
                        </div>
                        <div className="col-span-6">
                            <hr className="h-px my-3 bg-gray-50 text-gray-400 border-1 dark:bg-gray-700"></hr>
                        </div>
                            <div className="col-span-6">  
                            {isInfografisLoading || isInfografisFetching && (!infografis || infografis.length === 0) ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                    key={index}
                                    className="flex flex-col py-3 animate-pulse bg-gray-50 hover:bg-gray-100"
                                    >
                                    <dd className="h-6 bg-gray-200 rounded w-3/4 mb-2"></dd>
                                    <dt className="h-4 bg-gray-200 rounded w-1/2"></dt>
                                    </div>
                                ))
                                ) : !isInfografisFetching && (!infografis || infografis.length === 0) ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Infografis tidak ditemukan</p>
                                </div>
                                ) : isInfografisError && !isInfografisFetching ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Refetch refetch={refetchInfografis} />
                                </div>
                                ) : (
                                <>
                                    {
                                        infografis.map((infografis: Infografis , index:number) => (
                                            <div 
                                            key={infografis.id}
                                            onClick={()=> {setIsOpen(true); setCurrentIndex(index)}}
                                            className={`flex flex-col py-3 ${
                                                index % 2 === 0 ? 'bg-gray-50' : ''
                                            } hover:bg-gray-100 transition-colors duration-200`}
                                            >
                                                <dt className="mb-1 font-semibold text-gray-900 md:text-lg dark:text-gray-400">
                                                    <span className="block">{infografis.title}</span>
                                                </dt>
                                                <dd className="text-mb text-gray-500 line-clamp-3 dark:text-white">
                                                    {infografis.description}
                                                </dd>
                                            </div>
                                        ))
                                    }
                                    <LightboxImage data={infografis} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="col-span-6">
                            <span id="wisata" className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Wisata</span>
                        </div>
                        <div className="col-span-6">
                            <hr className="h-px my-3 text-gray-400 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        </div>
                            <div className="col-span-6">  
                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                {isTourLoading || isTourFetching && tour?.pages[0]?.data.length === 0 ? (
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col py-3 animate-pulse bg-gray-50 hover:bg-gray-100"
                                            >
                                            <dd className="h-6 bg-gray-200 rounded w-3/4 mb-2"></dd>
                                            <dt className="h-4 bg-gray-200 rounded w-1/2"></dt>
                                        </div>
                                    ))
                                    ) : !isTourFetching && tour?.pages[0]?.data.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <p className="text-black text-2xl dark:text-gray-400 text-center">Wisata tidak ditemukan</p>
                                        </div>
                                    ) : isTourError && !isTourFetching ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <Refetch refetch={refetchTour} />
                                        </div>
                                    ) : (
                                    tour?.pages[0]?.data.map((tour, index) => (
                                        <Link  key={tour.id} href={`/tour/${tour.slug}`} tabIndex={1} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full">
                                            <div
                                            className={`flex flex-col py-3 ${
                                                index % 2 === 0 ? 'bg-gray-50' : ''
                                            } hover:bg-gray-100 transition-colors duration-200`}
                                            >
                                                <dt className="mb-1 font-semibold text-gray-900 md:text-lg dark:text-gray-400">
                                                    <span className="block">{tour.title}</span>
                                                </dt>
                                                <dd className="text-mb text-gray-500 line-clamp-3 dark:text-white">
                                                    {tour.description}
                                                </dd>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
