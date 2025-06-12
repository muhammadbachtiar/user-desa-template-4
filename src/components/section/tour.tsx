'use client'
import Link from "next/link";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";

const Tour = () => {

    const { data, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
      const backgroundStyle = data?.value?.imageUrl 
        ? { backgroundImage: `url(${data.value.imageUrl})` }
        : { backgroundImage: `url(/images/unavailable-image.png)`};

  return (
       <>
        <section className="relative w-full max-w-11/12 flex justify-center items-center overflow-hidden">
            <div className="col-span-4 w-full grid grid-cols-6 gap-10 justify-items-center rounded-md">
                {
                    isSettingLoading ? (
                    <>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-2 flex justify-center items-center dark:bg-gray-800 animate-pulse">
                            <div className="h-full w-full min-h-96 min-w-96 shadow-2xl backdrop-blur-2xl rounded-4xl bg-gray-300"></div>
                        </div>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12 animate-pulse">
                            <div className="h-10 w-3/4 bg-gray-300 rounded mb-5"></div>
                            <div className="h-6 w-1/2 bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-11/12 bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-10/12 bg-gray-300 rounded mt-2"></div>
                            <div className="inline-flex justify-center mt-8 border-2 lg:mt-12 items-center py-4 px-6 rounded-md bg-gray-300 w-40 h-10"></div>
                        </div>
                    </>
                    ) : isSettingError && !isSettingFetching  ? (
                        <div className="w-full col-span-6 xl:col-span-2 flex justify-center dark:bg-gray-800">          
                            <Refetch refetch={refetchSetting} />
                        </div>
                    ) : (
                      <>
                         <div style={backgroundStyle} className={`relative w-full bg-cover bg-bottom col-span-6 rounded-md`}>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/30 to-black/20 rounded-md"></div>
                            <div className="relative h-full flex flex-col justify-center items-center p-8 md:px-24 xl:px-56 text-center md:py-16 gap-4">
                                 <p className="text-lg md:text-xl font-medium text-white mb-4 tracking-wide">
                                    {data?.value?.subTitle ?? "[Sub judul wisata belum diatur]"}
                                </p>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
                                    {data?.value?.title ?? "[Judul wisata belum diatur]"}
                                </h1>

                                <p className="text-md md:text-xl text-white/90 mb-8 font-light">
                                    {data?.value?.description ?? "[Deskripsi wisata belum diatur]"}
                                </p>

                                <Link 
                                href={'/tour'} 
                                className="inline-flex uppercase justify-center items-center px-6 py-4 text-base md:text-md font-semibold text-white bg-[#850000]/90 hover:bg-[#850000]/60 rounded-xs transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-orange-300 shadow-lg"
                                >
                                    Lihat selengkapnya
                                </Link>
                            </div>
                        </div>
                      </>
                    )
                }
            </div>
        </section>
       </>
  );
};

export default Tour;