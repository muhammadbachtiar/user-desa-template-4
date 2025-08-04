'use client'
import SliderCard from '../shared/sliderArticle';
import Link from 'next/link';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';

export default function Article() {
  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)`};

  return (
    <section className="relative w-full flex justify-center items-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl grid grid-cols-8 gap-2 bg-white dark:bg-gray-700 dark:border-gray-600 ">
            {
              isSettingLoading ? (
                  <div className="flex animate-pulse mb-4 col-span-8 w-full">
                    <div className="h-52 w-full flex-1 rounded-2xl"></div>
                  </div>
              ) : isSettingError && !isSettingFetching  ? (
                  <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetchSetting} />
                  </div>
              ) : (
                <>
                    <div className="flex flex-wrap justify-between col-span-8">
                      <h2 className="text-3xl md:text-4xl text-black font-bold text-left">
                        {setting?.value?.title || "[Judul artikel belum diatur]"}
                      </h2>
                      <Link
                        href="/article"
                        className="inline-flex justify-center items-center py-2 text-base font-medium text-[#850000] rounded-lg border border-white hover:text-gray-900 hover:underline transition transform duration-300 ease-in-out"
                      >
                        Lihat selengkapnya
                      </Link>
                    </div>
                </>
              )
            }
            <div className="col-span-8 grid grid-cols-4 h-full w-full font-medium md:gap-x-4 justify-center justify-items-center">
                <div className="col-span-4 max-w-full w-full overflow-hidden dark:bg-gray-800 dark:border-gray-700"> <SliderCard/></div>
            </div>
        </div>
    </section>
  );
}
