'use client'

import SliderCard from '../shared/sliderArticle';
import Link from 'next/link';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';

export default function ArticleSection() {
  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  return (
    <section className="relative w-full flex justify-center items-center">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-5">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              {isSettingLoading ? (
                <div className="flex animate-pulse space-x-3">
                  <div className="flex flex-col justify-center gap-y-3">
                    <div className="h-8 w-40 rounded bg-gray-200"></div>
                    <div className="h-4 w-56 rounded bg-gray-200"></div>
                  </div>
                </div>
              ) : isSettingError && !isSettingFetching ? (
                <Refetch refetch={refetchSetting} />
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-[#2B2024] dark:text-white">
                    {setting?.value?.title ?? 'Artikel'}
                  </h2>
                  {setting?.value?.subTitle && (
                    <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                      {setting.value.subTitle}
                    </p>
                  )}
                </>
              )}
            </div>
            <Link
              href="/article"
              className="inline-flex font-medium items-center text-center text-[#850000] hover:text-[#650000] rounded-xl px-4 py-2 border-2 border-[#850000]/30 hover:border-[#850000]/50 hover:bg-[#850000]/5 transition-colors duration-200"
            >
              Lihat Semua
              <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
              </svg>
            </Link>
          </div>

          {/* Article Slider */}
          <div className="w-full overflow-hidden">
            <SliderCard />
          </div>
        </div>
      </div>
    </section>
  );
}
