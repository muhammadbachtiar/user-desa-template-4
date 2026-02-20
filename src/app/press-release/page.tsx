"use client"
import { PressReleaseCard } from '@/components/shared/PressReleaseCard'
import React, { useEffect, useRef, useState } from 'react'
import SelectCategory from '@/components/shared/form/selectCategory'
import CustomDatePicker from '@/components/shared/DatePicker'
import usePressRelease from '@/hooks/contents/press-release/usePressRelease'
import { PressReleaseType } from '@/services/controlers/press-release/pressRelease.type'
import { useRouter } from 'next/navigation'
import useFeatureFlags from '@/hooks/settings/useFeatureFlags'
import useSetting from '@/hooks/settings/useSettings'
import { BiPlus } from 'react-icons/bi'

export default function PressReleaseListPage() {
  const router = useRouter();
  const { pressRelease, isLoading: isFeaturesLoading } = useFeatureFlags();

  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setRangeDate] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = usePressRelease({
    page: 1,
    page_size: 9,
    search: searchTerm,
    date: dateRange,
    sortBy: 'publishedAt',
  }, categoryId)

  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`press-release-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const pressReleaseData = data?.pages.flatMap((page) => page?.data) ?? []

  useEffect(() => {
    if (!isFeaturesLoading && !pressRelease) {
      router.replace('/');
    }
  }, [pressRelease, isFeaturesLoading, router]);

  // Loading state saat mengecek features
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

  if (!pressRelease) {
    return null;
  }

  const backgroundStyle = setting?.value?.imageUrl
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)` }

  return (
    <>

      <div className="w-full flex justify-center mt-24 sm:mt-16 py-4">
        <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl grid justify-center items-center grid-cols-3 lg:grid-cols-4 gap-y-6">
          <div className="w-full bg-transparent rounded-s-md col-span-4 py-6 grid grid-cols-6">
            <div className="col-span-6 grid grid-cols-6 gap-4">
              {/* Search */}
              <div className="relative w-full col-span-6">
                <input
                  id="search-press-release"
                  type='search'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block py-3 px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cari siaran pers ..."
                />
                <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </span>
              </div>

              {/* Filters */}
              <div className="relative w-full col-span-6 md:col-span-2">
                <SelectCategory setCategoryId={setCategoryId} />
              </div>
              <div className="relative w-full col-span-6 md:col-span-4">
                <CustomDatePicker setDate={setRangeDate} />
              </div>

              {/* Cards Grid */}
              <div className="w-full col-span-6 mt-4 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center">
                {isLoading || (!data || !data.pages[0] || data.pages[0]?.data.length === 0) && isFetching ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 animate-pulse w-full">
                      <div className="h-64 w-full flex-1 rounded-2xl bg-gray-200"></div>
                    </div>
                  ))
                ) : !isFetching && (pressReleaseData.length === 0 || pressReleaseData[0] === undefined) ? (
                  <div className="flex col-span-6 w-full h-full justify-center">
                    <div className="flex min-h-96 flex-col items-center justify-center gap-2">
                      <p className="text-black text-2xl dark:text-gray-400 text-center">Siaran pers tidak tersedia</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {pressReleaseData.map((item: PressReleaseType) => (
                      <div tabIndex={1} key={item.id} className="col-span-6 md:col-span-3 lg:col-span-2 w-full">
                        <PressReleaseCard
                          id={item.id}
                          category={item.category?.name}
                          title={item.title}
                          description={item.description}
                          date={item.published_at}
                          image={item.thumbnail ?? '/images/placeholder.svg'}
                          slug={item.slug}
                          author={item.user?.name}
                        />
                      </div>
                    ))}
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
                {isFetchingNextPage && (
                  <div className="col-span-6 flex justify-center items-center py-10">
                    <span className="text-gray-600 animate-pulse">Memuat data...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
