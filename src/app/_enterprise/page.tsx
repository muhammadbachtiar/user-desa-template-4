'use client'
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import SelectCategory from "@/components/shared/form/selectCategory";
import EnterpriseCard from "@/components/shared/enterpriseCard";
import useEnterprise from "@/hooks/contents/enterprise/useList";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "@/components/shared/refetch";


export default function Home() {
const [categoryId, setCategoryId] = useState(0);
const [search, setSearch] = useState('');

const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting("enterprise", {});
const { data, isLoading, isFetching,  isError } = useEnterprise({"search": search, "categoryId": categoryId});

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundColor: '#f3f4f6' };

  return (
      <>
        {
            isSettingLoading ? (
                <div className="flex animate-pulse mb-4 col-span-8 w-full">
                <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
            ) : isSettingError && !isSettingFetching && !setting || !setting.value ? (
                <div className="flex min-h-52 mb-4 justify-center col-span-8 w-full">
                <p className="text-black text-center text-md dark:text-gray-400">Data tidak tersedia</p>
                </div>
            ) : isSettingError && !isSettingFetching  ? (
                <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetchSetting} />
                </div>
            ) : (
                <section style={backgroundStyle} className={`relative rounded-md p-4 lg:p-8 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end`}>
                    <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                    <div className="relative z-10 px-0 sm:px-8  text-start">
                        <h2 className="mb-2 text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting.value.title}</h2>
                        <p className="sm:mb-2 text-sm sm:text-md font-light tracking-tight text-white">{setting.value.description}</p>
                    </div>
                </section>
            )
        }
        <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6">
            <div className="bg-transparent rounded-s-md col-span-4 lg:py-6 grid grid-cols-6">    
                <div className="col-span-6 grid grid-cols-6 gap-8">
                    <div className="col-span-6 grid grid-cols-6 gap-1 px-6 md:px-0 justify-between">
                        <div className="col-span-6 md:col-span-2 lg:col-span-1">
                            <SelectCategory setCategoryId={setCategoryId}/>
                        </div>
                        <div className="col-span-6 md:col-span-4 lg:col-span-5 text-end">
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
                    <div className="col-span-6 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center">
                        {isLoading ? (
                            <></>
                        ) : isError && !isFetching && !data.value || data.value.length === 0 ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="w-full col-span-6 h-full flex justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Terjadi kesalahan, silakan ulangi</p>
                                    {/* <Button
                                        size="sm"
                                        onClick={() => {
                                            refetch();
                                        }}
                                    >
                                        <LuRefreshCcw size={24} />
                                    </Button> */}
                                </div>
                            </div>
                        ) : (
                            <>
                                {data.value.map((card) => 
                                    <div tabIndex={1} key={card.id} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full">
                                         <EnterpriseCard thumbnail={card.thumbnail}isVerified={card.isVerified} waNumber={card.waNumber} slug={card.slug} title={card.title} description={card.description} category_name={card.category.name} published_at={card.published_at} /> 
                                    </div>
                                )}
                                <div className="col-span-6">
                                    <button 
                                        className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                        // onClick={() => fetchNextPage()} 
                                        // disabled={!hasNextPage || isFetching}
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
