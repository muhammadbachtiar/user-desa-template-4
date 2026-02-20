'use client'
import { useEffect, useState } from "react";
import { BiGlobe, BiMap, BiPlus } from "react-icons/bi";
import useTour from "@/hooks/contents/tour/useList";
import Link from "next/link";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Refetch from "@/components/shared/refetch";
import useSetting from "@/hooks/settings/useSettings";
import { useRouter } from "next/navigation";
import useFeatureFlags from "@/hooks/settings/useFeatureFlags";


export default function Home() {
const router = useRouter();
const { isSectionEnabled, isLoading: isFeaturesLoading } = useFeatureFlags();
const [search, setSearch] = useState('');

const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch, isError } = useTour({"search": search, 'page_size': 6});
const allTour = data?.pages?.flatMap(page => page?.data) || [];

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)`};

useEffect(() => {
    if (!isFeaturesLoading && !isSectionEnabled("tour")) {
      router.replace('/');
    }
  }, [isFeaturesLoading, isSectionEnabled, router]);

  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center min-h-screen w-full mt-24 sm:mt-16 py-4">
        <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
        <div className="w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!isSectionEnabled("tour")) {
    return null;
  }

  return (
      <>
         {
            isSettingLoading ? (
                <div className="flex animate-pulse mb-4 col-span-8 w-full mt-24 sm:mt-16">
                     <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
                    <div className="h-44 sm:h-52 w-full flex-1 rounded-2xl"></div>
                </div>
            ) : isSettingError && !isSettingFetching  ? (
                <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetchSetting} />
                </div>
            ) : (
                <>
                    <section style={backgroundStyle} className="relative rounded-md p-4 sm:p-6 lg:p-14 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end">
                        <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                        <div className="relative z-10 px-0 sm:px-8 text-start">
                            <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting?.value?.title || "[Judul wisata belum diatur]"}</h2>
                        </div>
                    </section>
                </>
            )
        }
       <div className="w-full flex items-center justify-center">
            <div className="w-full px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl grid grid-cols-1 gap-y-4 sm:gap-y-6">
                <div className="bg-transparent rounded-s-md py-4 lg:py-6">    
                    <div className="grid grid-cols-1 gap-6 sm:gap-8">
                        {/* Search */}
                        <div className="px-0">
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown" value={search} onChange={(e) => setSearch(e.target.value)} className="block py-2.5 sm:py-3 px-4 sm:px-5 pe-10 sm:pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." />
                                <span className="absolute top-0 end-0 py-2.5 sm:py-3 px-4 sm:px-5 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="min-w-4 min-h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Tour Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {isLoading || (allTour[0] === undefined && isFetching) ? (
                                <>
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <div key={index} className="flex flex-col justify-center dark:bg-gray-800 animate-pulse">
                                            <div className="relative rounded-3xl overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] flex justify-center items-end bg-gray-300"></div>
                                        </div>
                                    ))}
                                </>
                            ) : !isError && !isFetching && allTour[0] === undefined ? (
                                <div className="flex col-span-full w-full h-full justify-center">
                                    <div className="flex min-h-64 sm:min-h-96 flex-col items-center justify-center gap-2">
                                        <p className="text-black text-lg sm:text-2xl dark:text-gray-400 text-center">Wisata tidak tersedia</p>
                                    </div>
                                </div>
                            ) : isError && !isFetching ? (
                                <div className="w-full col-span-full h-full flex justify-center">
                                    <div className="flex min-h-64 sm:min-h-96 flex-col items-center justify-center gap-2">
                                        <p className="text-black text-lg sm:text-2xl dark:text-gray-400 text-center">Terjadi kesalahan, silakan ulangi</p>
                                        <Refetch refetch={refetch}/>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {allTour.map((card) => 
                                        <div
                                            tabIndex={1}
                                            key={card.id}
                                            className="group hover:scale-[1.02] focus:scale-[1.02] transition duration-300 ease-in-out"
                                        >
                                            <Link href={`/tour/${card?.slug ?? ""}`} className="flex flex-col gap-2">
                                                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full flex justify-center items-end">
                                                     <Image
                                                            className="w-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition duration-500 ease-in-out"
                                                            src={card?.thumbnail || "/images/unavailable-image.png"}
                                                            alt="Tour Thumbnail"
                                                            fill
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                            priority
                                                        />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:py-8 md:pl-8 w-full md:w-5/6">
                                                        <h5 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight group-hover:text-white/70 line-clamp-2 transition-colors">
                                                            {card.title}
                                                        </h5>

                                                        <div className="mt-1.5 sm:mt-2 md:mt-3">
                                                            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90 max-w-md line-clamp-2 sm:line-clamp-3">
                                                                {card?.description ?? "[Deskripsi tidak tersedia]"}
                                                            </p>
                                                        </div>

                                                        <div className="mt-2 sm:mt-3 md:mt-4 grid grid-cols-1 gap-1.5 sm:gap-2">
                                                             {card?.address && (
                                                                <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                                                                    <BiMap className="min-w-3.5 min-h-3.5 sm:min-w-4 sm:min-h-4 rounded-sm text-[#B90B0B]"></BiMap>
                                                                    <span
                                                                    className="text-xs sm:text-sm font-normal text-white hover:text-[#B90B0B] transition-colors truncate"
                                                                    >
                                                                    {card?.address ?? ""}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {card?.link?.website && (
                                                                <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                                                                    <BiGlobe className="min-w-3.5 min-h-3.5 sm:min-w-4 sm:min-h-4 rounded-sm text-[#B90B0B]"></BiGlobe>
                                                                    <span
                                                                    className="text-xs sm:text-sm font-normal text-white hover:text-[#B90B0B] transition-colors truncate max-w-[120px] sm:max-w-[150px]"
                                                                    >
                                                                    {card?.link?.website ?? ""}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {card?.link?.email && (
                                                                <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                                                                    <CgMail className="min-w-3.5 min-h-3.5 sm:min-w-4 sm:min-h-4 rounded-sm text-[#B90B0B]"></CgMail>
                                                                    <span
                                                                    className="text-xs sm:text-sm font-normal text-white hover:text-[#B90B0B] transition-colors truncate max-w-[120px] sm:max-w-[150px]"
                                                                    >
                                                                    {card?.link?.email ?? ""}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}     
                                </>
                            )}
                        </div>

                        {/* Load More Button */}
                        {!isLoading && !isError && allTour.length > 0 && (
                            <div className="grid grid-cols-1">
                                <button 
                                    className=" inline-flex justify-center items-center gap-2 py-2 sm:py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                    onClick={() => fetchNextPage()} 
                                    disabled={!hasNextPage || isFetching}
                                >
                                    Tampilkan lebih banyak
                                    <BiPlus />
                                </button>
                            </div>
                            
                        )}
                    </div>
                </div>
            </div>
       </div>
      </>
  );
}
