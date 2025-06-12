'use client'
import { useState } from "react";
import { BiGlobe, BiPlus } from "react-icons/bi";
import useTour from "@/hooks/contents/tour/useList";
import Link from "next/link";
import { CiMap } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Refetch from "@/components/shared/refetch";
import useSetting from "@/hooks/settings/useSettings";


export default function Home() {
const [search, setSearch] = useState('');

const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch, isError } = useTour({"search": search, 'page_size': 6});
const allTour = data?.pages?.flatMap(page => page?.data) || [];

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)`};

  return (
      <>
         {
            isSettingLoading ? (
                <div className="flex animate-pulse mb-4 col-span-8 w-full">
                    <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
            ) : isSettingError && !isSettingFetching  ? (
                <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetchSetting} />
                </div>
            ) : (
                <>
                    <section style={backgroundStyle} className={`relative rounded-md p-4 lg:p-14 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end`}>
                        <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                        <div className="relative z-10 px-0 sm:px-8  text-start">
                            <h2 className="mb-4 text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting?.value?.title || "[Judul wisata belum diatur]"}</h2>
                        </div>
                    </section>
                </>
            )
        }
        <div className="grid w-full max-w-11/12 grid-cols-3 lg:grid-cols-4 gap-y-6">
            <div className="bg-transparent rounded-s-md col-span-4 lg:py-6 grid grid-cols-6">    
                <div className="col-span-6 grid grid-cols-6 gap-8">
                    <div className="col-span-6 grid grid-cols-6 gap-1 px-3 md:px-0 justify-between">
                        <div className="col-span-6 text-end">
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown"value={search} onChange={(e) => setSearch(e.target.value)} className="block py-3 px-5 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." />
                                <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center ">
                        {isLoading || (allTour[0] === undefined && isFetching)  ? (
                            <div className="col-span-6 grid grid-cols-12 w-full h-full justify-center gap-3">
                               {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col justify-center dark:bg-gray-800 animate-pulse">
                                      <div className="relative rounded-4xl overflow-hidden min-h-[68vh] flex justify-center items-end bg-gray-300"></div>
                                    </div>
                                  ))                                  
                               }
                            </div>
                        ) : !isError && !isFetching && allTour[0] === undefined ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Wisata tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="w-full col-span-6 h-full flex justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Terjadi kesalahan, silakan ulangi</p>
                                   <Refetch refetch={refetch}/>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col-span-6 grid grid-cols-12 px-3 md:px-0 gap-6 w-full">
                                    {allTour.map((card) => 
                                        <div
                                            tabIndex={1}
                                            key={card.id}
                                            className="col-span-12 md:col-span-6 xl:col-span-4 group hover:scale-[1.02] focus:scale-[1.02] transition duration-300 ease-in-out"
                                            >
                                            <Link href={`/tour/${card?.slug ?? ""}`} className="flex flex-col gap-2">
                                                <div className="relative overflow-hidden rounded-3xl h-[200px] sm:h-[250px] md:h-[300px] w-full flex justify-center items-end">
                                                    <Image
                                                        className="absolute top-0 left-0 w-full min-w-full min-h-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition duration-500 ease-in-out"
                                                        src={card?.thumbnail || "/images/unavailable-image.png"}
                                                        alt="Tour Thumbnail"
                                                        width={1200}
                                                        height={600}
                                                        priority
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 w-full md:w-2/3">
                                                        <h5 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight group-hover:text-[#B90B0B] line-clamp-2  transition-colors">
                                                            {card.title}
                                                        </h5>

                                                        <div className="mt-2 md:mt-3">
                                                            <p className="text-sm sm:text-base md:text-lg font-medium text-white/90 max-w-md truncate">
                                                            {card?.address ?? "[Alamat tidak tersedia]"}
                                                            </p>
                                                        </div>

                                                        <div className="mt-3 md:mt-4 grid grid-cols-1 gap-2">
                                                            {card?.link?.gmap && (
                                                                <div className="flex items-center gap-x-2">
                                                                    <CiMap className="w-4 h-4 rounded-sm text-[#B90B0B]"></CiMap>
                                                                    <a
                                                                    href={card?.link?.gmap || ""}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm font-normal text-white hover:text-[#B90B0B] transition-colors"
                                                                    >
                                                                    Lokasi
                                                                    </a>
                                                                </div>
                                                            )}

                                                            {card?.link?.website && (
                                                                <div className="flex items-center gap-x-2">
                                                                    <BiGlobe className="w-4 h-4 rounded-sm text-[#B90B0B]"></BiGlobe>
                                                                    <a
                                                                    href={card?.link?.website || ""}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm font-normal text-white hover:text-[#B90B0B] transition-colors truncate max-w-[150px]"
                                                                    >
                                                                    {card?.link?.website ?? ""}
                                                                    </a>
                                                                </div>
                                                            )}

                                                            {card?.link?.email && (
                                                                <div className="flex items-center gap-x-2">
                                                                    <CgMail className="w-4 h-4 rounded-sm text-[#B90B0B]"></CgMail>
                                                                    <a
                                                                    href={`mailto:${card?.link?.email || ""}`}
                                                                    className="text-sm font-normal text-white hover:text-[#B90B0B] transition-colors truncate max-w-[150px]"
                                                                    >
                                                                    {card?.link?.email ?? ""}
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}     
                                </div>
                                <div className="col-span-6">
                                    <button 
                                        className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                        onClick={() => fetchNextPage()} 
                                        disabled={!hasNextPage || isFetching}
                                    >
                                        Tampilkan lebih banyak
                                        <BiPlus />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </>
  );
}
