'use client'

import { use, useState } from "react";
import Refetch from "@/components/shared/refetch";
import useTour from "@/hooks/contents/tour/useList";
import useInfografis from "@/hooks/contents/infografis/useInfografis";
import { Infografis } from "@/services/controlers/infografis/type";
import Link from "next/link";
import LightboxImage from "@/components/shared/Lightbox";
import useArticle from "@/hooks/contents/article/useList";
import useFeatureFlags from "@/hooks/settings/useFeatureFlags";
import { BiSearch, BiNews, BiImage, BiMap } from "react-icons/bi";

interface PageProps {
    params: Promise<{ search: string }>;
}
interface DynamicPageProps {
    params: { search?: string };
}

function TypeBadge({ type }: { type: "article" | "infografis" | "tour" }) {
    const config = {
        article: { label: "Artikel", icon: BiNews, color: "bg-blue-100 text-blue-700" },
        infografis: { label: "Infografis", icon: BiImage, color: "bg-emerald-100 text-emerald-700" },
        tour: { label: "Wisata", icon: BiMap, color: "bg-amber-100 text-amber-700" },
    };
    const { label, icon: Icon, color } = config[type];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    );
}

interface SearchResultItem {
    id: string | number;
    type: "article" | "infografis" | "tour";
    title: string;
    description?: string;
    slug?: string;
    href?: string;
    onClick?: () => void;
}

export default function Home({ params }: DynamicPageProps & PageProps) {
    const unwrappedParams = use(params);
    const [searchValue, setSearchValue] = useState(unwrappedParams.search || '');
    const { isSectionEnabled } = useFeatureFlags();

    const isTourEnabled = isSectionEnabled("tour");

    const { data: articles, isLoading: isArticleLoading, isFetching: isArticleFetching, refetch: refetchArticle, isError: isArticleError } = useArticle({ "search": searchValue, "page_size": 6, 'order': 'desc', 'by': 'published_at' }, 0);
    const { data: tour, isLoading: isTourLoading, isFetching: isTourFetching, refetch: refetchTour, isError: isTourError } = useTour({ "search": searchValue });
    const { data: infografis, isLoading: isInfografisLoading, isFetching: isInfografisFetching, refetch: refetchInfografis, isError: isInfografisError } = useInfografis({ "search": searchValue });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const isLoading = isArticleLoading || isInfografisLoading || (isTourEnabled && isTourLoading);
    const isFetching = isArticleFetching || isInfografisFetching || (isTourEnabled && isTourFetching);
    const hasAnyError = isArticleError || isInfografisError || (isTourEnabled && isTourError);

    const results: SearchResultItem[] = [];

    if (articles?.pages?.[0]?.data) {
        articles.pages[0].data.forEach((article: any) => {
            results.push({
                id: `article-${article.id}`,
                type: "article",
                title: article.title,
                description: article.description,
                slug: article.slug,
                href: `/article/${article.slug}`,
            });
        });
    }

    if (infografis && Array.isArray(infografis)) {
        infografis.forEach((item: Infografis, index: number) => {
            results.push({
                id: `infografis-${item.id}`,
                type: "infografis",
                title: item.title,
                description: item.description,
                onClick: () => { setIsOpen(true); setCurrentIndex(index); },
            });
        });
    }

    if (isTourEnabled && tour?.pages?.[0]?.data) {
        tour.pages[0].data.forEach((item: any) => {
            results.push({
                id: `tour-${item.id}`,
                type: "tour",
                title: item.title,
                description: item.description,
                slug: item.slug,
                href: `/tour/${item.slug}`,
            });
        });
    }

    const totalResults = results.length;

    return (
        <div className="min-h-screen flex justify-center w-full">
            <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
            <div className="mt-16 py-4 md:py-12 w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl z-10 flex flex-col gap-8">
                
                <div className="relative w-full">
                    <input 
                        id="search-dropdown" 
                        type="search" 
                        value={searchValue} 
                        onChange={handleChange} 
                        className="block py-4 px-5 pe-12 w-full rounded-xl shadow-sm text-sm text-gray-900 bg-white placeholder:text-gray-500 border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition-all duration-300" 
                        placeholder="Cari artikel, infografis, atau wisata..." 
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                        <BiSearch className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {!isLoading && !isFetching && (
                    <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-500">
                            {totalResults > 0
                                ? `Ditemukan ${totalResults} hasil untuk "${searchValue}"`
                                : searchValue
                                    ? `Tidak ada hasil untuk "${searchValue}"`
                                    : "Mulai mengetik untuk mencari..."
                            }
                        </span>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[300px]">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {isLoading || (isFetching && results.length === 0) ? (
                             Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="p-4 animate-pulse flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                                        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                </div>
                            ))
                        ) : hasAnyError && results.length === 0 ? (
                             <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <p className="text-gray-500 text-lg">Gagal memuat hasil pencarian.</p>
                                <div className="flex gap-2">
                                     <Refetch refetch={() => { refetchArticle(); refetchInfografis(); if(isTourEnabled) refetchTour(); }} />
                                </div>
                             </div>
                        ) : results.length === 0 ? (
                             <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
                                <div className="bg-gray-50 p-4 rounded-full">
                                    <BiSearch className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="max-w-xs">
                                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">Tidak ada hasil ditemukan</h3>
                                    <p className="text-gray-500 text-sm">Coba kata kunci lain atau periksa ejaan Anda.</p>
                                </div>
                             </div>
                        ) : (
                            results.map((item) => (
                                <SearchResultRow key={item.id} item={item} />
                            ))
                        )}
                    </div>
                </div>

                <LightboxImage data={infografis || []} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />

            </div>
        </div>
    );
}

function SearchResultRow({ item }: { item: SearchResultItem }) {
    const content = (
        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group cursor-pointer">
            <div className="flex items-center gap-2.5 mb-2">
                <TypeBadge type={item.type} />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {item.title}
                </h3>
            </div>
            {item.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {item.description}
                </p>
            )}
        </div>
    );

    if (item.href) {
        return <Link href={item.href}>{content}</Link>;
    }

    return <div onClick={item.onClick} role="button">{content}</div>;
}
