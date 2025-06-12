'use client'
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";

export default function Hero() {
    const { data, isLoading, isFetching, refetch, isError } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  return (
    <section className="relative w-full h-full min-h-screen flex items-center overflow-hidden">
          {
              isLoading ? (
                <div className="flex animate-pulse space-x-3 w-full">
                  <div className="h-screen w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
            ) : isError && !isFetching  ? (
                <>  <Refetch refetch={refetch} /></>
            ) : (
              <>
                  <video
                      className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-125 sm:scale-100"
                      autoPlay
                      loop
                      muted
                  >
                      <source src={ data?.value?.videoUrl ?? '/unavailablei-image.png'} type="video/mp4" />
                  </video>
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
                  <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 w-full mt-10 sm:mt-20">
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
            )
          }
    </section>
    
  
  );
}
