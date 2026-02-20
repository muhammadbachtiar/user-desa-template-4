'use client'
import Image from "next/image";
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";
import { motion } from "framer-motion";

export default function Hero() {
  const { data, isLoading, isFetching, refetch, isError } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const src = data?.value?.videoUrl || data?.value?.imageUrl || '/images/not-fuound-image.jpg';
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);

  const hasTextContent = !!(data?.value?.title || data?.value?.description);

  if (isLoading) {
    return (
      <section className="relative w-full h-full min-h-screen flex justify-center items-center overflow-hidden">
        <div className="flex animate-pulse space-x-3 w-full px-6">
          <div className="h-screen w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>
      </section>
    );
  }

  if (isError && !isFetching) {
    return (
      <section className="relative w-full h-full min-h-screen flex justify-center items-center overflow-hidden">
        <Refetch refetch={refetch} />
      </section>
    );
  }

  if (hasTextContent) {
    return (
      <section className="relative w-full h-full min-h-screen flex justify-center items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0 scale-125 sm:scale-100">
          {isVideo ? (
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>

        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl relative z-20 mt-10 sm:mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[90%] sm:max-w-xl"
          >
            <h1 className="mb-6 text-xl sm:text-2xl xl:text-3xl font-bold text-white leading-tight drop-shadow-lg">
              {data?.value?.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white opacity-90 leading-relaxed drop-shadow-md">
              {data?.value?.description}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full pt-15 lg:pt-0 bg-[#DFDFDF] dark:bg-gray-900">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
      <div className="relative w-full">
        {isVideo ? (
          <video className="w-full h-auto block" autoPlay loop muted>
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={src}
            alt="Hero Image"
            className="w-full h-auto block"
          />
        )}
      </div>
    </section>
  );
}
