'use client'
import Image from "next/image";
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";

export default function Hero() {
  const { data, isLoading, isFetching, refetch, isError } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const src = data?.value?.videoUrl || data?.value?.imageUrl || '/images/not-fuound-image.jpg';

  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);

  return (
    <section className="relative w-full h-full min-h-screen flex justify-center items-center overflow-hidden">
      {isLoading ? (
        <div className="flex animate-pulse space-x-3 w-full">
          <div className="h-screen w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>
      ) : isError && !isFetching ? (
        <Refetch refetch={refetch} />
      ) : (
        <>
          <div className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-125 sm:scale-100">
          {isVideo ? (
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt="Media thumbnail"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl relative z-10 mt-10 sm:mt-20">
          <div className="max-w-[90%] sm:max-w-xl">
            <h1 className="mb-6 text-xl sm:text-2xl xl:text-3xl font-bold text-white leading-tight">
              {data?.value?.title || "[Judul hero belum diatur]"}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white opacity-90 leading-relaxed">
              {data?.value?.description || "[Deskripsi hero belum diatur]"}
            </p>
          </div>
        </div>
        </>
      )}
    </section>
  );
}
