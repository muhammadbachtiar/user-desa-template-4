"use client"

import { useParams } from "next/navigation";
import Image from "next/image";
import useTourDetail from "@/hooks/contents/tour/useDetail";
import { CgMail } from "react-icons/cg";
import { BiGlobe } from "react-icons/bi";
import { CiMap } from "react-icons/ci";
import sosmedIcons from "@/components/shared/sosmedIcons";
import StreetViewChecker from "@/services/utils/checkStreetView";
import Refetch from "@/components/shared/refetch";

const TourDetail = () => {
    const { slug } = useParams();
    const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY
    const { data: tour, isLoading: isLoadingTour, isFetching: isFetchingTour, refetch: refetchTour, isError: isErrorTour } = useTourDetail({}, String(slug));
    const isStreetAvailable = StreetViewChecker({lat: Number(tour?.latitude), lng: Number(tour?.longitude)});
    let mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${tour?.latitude},${tour?.longitude}`;
    if(isStreetAvailable){
        mapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${tour?.latitude},${tour?.longitude}&heading=0&pitch=0`
    }
  return (
    <>  
        <div className="min-h-screen w-full mt-16">
            <div className="absolute inset-0 h-[15%] bg-gradient-to-b from-black/25 to-white/5"></div>
            {isLoadingTour || isFetchingTour && (!tour || Object.keys(tour || {}).length === 0) ? (
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-full animate-pulse">

                <div className="lg:col-span-6 lg:sticky lg:top-0 lg:h-screen">
                  <div className="h-full w-full flex items-start justify-center p-3 lg:p-6">
                    <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] rounded-xl bg-gray-300"></div>
                  </div>
                </div>
              
                <div className="lg:col-span-6 p-4 lg:p-6 lg:overflow-y-auto">
                  <div className="flex flex-col gap-y-6">

                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-300"></div>
              
                    <div className="space-y-2">
                      <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                      <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-1/5 bg-gray-300 rounded"></div>
                    </div>
              
                    <div className="h-5 w-full bg-gray-300 rounded"></div>
                    <div className="h-5 w-11/12 bg-gray-300 rounded"></div>
                    <div className="h-5 w-10/12 bg-gray-300 rounded"></div>

                    <div className="flex flex-wrap gap-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="w-10 h-10 rounded-md bg-gray-300"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>              
            ) : !isErrorTour && !isFetchingTour && (!tour || Object.keys(tour || {}).length === 0) ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorTour && !isFetchingTour  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <Refetch refetch={refetchTour}/>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-full">
                        <div className="lg:col-span-6 lg:sticky top-0 lg:h-screen ">
                            <div className="h-full w-full flex items-start justify-center p-3 lg:p-6">
                                <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] rounded-xl overflow-hidden">
                                    {
                                        !tour?.latitude && !tour?.longitude && !gmapsApiKey ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                <p className="text-gray-500 dark:text-gray-400">Map location not available</p>
                                            </div>
                                        ) : (
                                            <iframe
                                                src={mapsUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title={`Map of ${tour?.title}`}
                                                className="absolute inset-0"
                                            />
                                        )  
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 p-4 lg:p-6 lg:overflow-y-auto">
                            <div className="flex flex-col gap-y-6">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">
                                        {tour?.title}
                                    </h1>
                                    <div className="flex items-center">
                                        <p className="text-sm sm:text-md md:text-lg font-semibold text-gray-900 dark:text-white">{tour?.address}</p>
                                    </div>
                                </div>
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                                    <Image
                                    className="object-cover"
                                    src={tour?.thumbnail || "/placeholder.svg"}
                                    alt="Tour Thumbnail"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-x-2">
                                    <CiMap className="w-5 h-5 text-[#B90B0B]" />
                                    <a
                                        href={tour?.link?.gmap || ''}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-md text-gray-900 dark:text-white hover:font-bold transition-all"
                                    >
                                        Lokasi
                                    </a>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                    <BiGlobe className="w-5 h-5 text-[#B90B0B]" />
                                    <a
                                        href={`https://${tour?.link.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-md text-gray-900 dark:text-white hover:font-bold transition-all"
                                    >
                                        {tour?.link?.website || '[Website tidak tersedia]'}
                                    </a>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                    <CgMail className="w-5 h-5 text-[#B90B0B]" />
                                    <a
                                        href={`mailto:${tour?.link?.email || ''}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-md text-gray-900 dark:text-white hover:font-bold transition-all"
                                    >
                                        {tour?.link?.email ?? '[Email tidak tersedia]'}
                                    </a>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{tour?.description}</p>
                                <div className="flex flex-wrap gap-4">
                                    {tour?.link?.sosmed &&
                                        Object.entries(tour?.link?.sosmed).map(([key, value]) => {
                                        const Icon = sosmedIcons[value.key]
                                        return (
                                        <a
                                            key={key}
                                            href={`https://${value}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-500 hover:bg-[#F3F9FB] group transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out"
                                        >
                                            {Icon ? <Icon className="w-5 h-5 text-white group-hover:text-gray-900" /> : <span>{key}</span>}
                                        </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    </>
  );
};

export default TourDetail;
