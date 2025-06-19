'use client'

import Icons from '../shared/icons';
import Link from 'next/link';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';

export default function App() {

  const { data, isLoading, isFetching, refetch, isError } = useSetting(`service-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: appSetting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting(`app-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  return (
        <section className="flex rounded-md mb-2 max-w-11/12 w-full justify-center bg-[#850000] py-2 fixed bottom-0 z-10 dark:bg-gray-700 dark:border-gray-600 my-0 md:my-4 md:static md:grid md:grid-cols-8 md:gap-2 md:bg-transparent md:border-0">
            <div className='hidden md:flex flex-col col-span-8 gap-2 min-h-16 mb-4 justify-items-center items-center '>
                {
                    isSettingLoading ? (
                        <div className="flex animate-pulse space-x-3">
                            <div className="flex flex-col justify-center items-center align-middle gap-y-6">
                                <div className=" h-8 w-30 rounded bg-gray-200"></div>
                                <div className="h-4 w-36 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    ) : isSettingError && !isSettingFetching  ? (
                        <Refetch refetch={refetchSetting} />
                    ) : (
                        <>
                           <span className="self-center align-baseline text-3xl font-bold leading-tight text-[#2B2024] md:text-4xl">
                                {appSetting?.value?.title ?? "[Judul layanan belum diatur]"}
                            </span>
                            <span className="self-center align-baseline text-lg font-medium text-gray-500 md:text-xl">
                                {appSetting?.value?.subTitle ?? "[Sub judul layanan belum diatur]"}
                            </span>
                        </>
                    )
                }
            </div>
            <div className="max-w-screen overflow-x-auto flex flex-row md:flex-wrap col-span-8 min-h-14 md:justify-center items-center w-full h-full font-medium px-2 gap-y-4">
                    {
                        isLoading || (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) && isFetching ? (
                            <div className="flex justify-center w-full col-span-4 animate-pulse space-x-3">
                                {Array.from({length:4}).map((_, index) => (
                                    <div key={index} className="flex flex-col gap-4 mx-2 p-4 bg-gray-200 rounded-md w-20 md:w-full h-14 md:h-56"></div>
                                ))}
                            </div>
                        ) : !isError && !isFetching && (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) ? (
                            <><p className="text-black text-center text-md dark:text-gray-400">Layanan tidak tersedia</p></>
                        ) : isError && !isFetching  ? (
                            <Refetch refetch={refetch} />
                        ) : 
                            ((Array.isArray(data?.value) ? data.value : []) 
                                .sort((a, b) => a.order - b.order)
                                .map((item, index) => {
                                const IconComponent = Icons[item.icon] ?? Icons.FaQuestion
                                return <div key={index} className={`w-full md:w-fit flex items-center ${index !== data.value.length - 1 ? 'border-r border-gray-300' : ''}`}>
                                            {
                                                item.link.startsWith("http") ? (
                                                    <a href={item.link} target='blank' key={index} rel="noopener noreferrer" className="group min-w-20 w-full md:min-w-60 md:w-fit inline-flex flex-col items-center justify-center focus:ring-0 focus:bg-none md:p-0 md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-gray-800 md:focus:ring-2 md:focus:ring-gray-200 md:focus:bg-gray-100">
                                                            <div className="relative overflow-hidden rounded-sm w-full flex justify-center group">
                                                                <IconComponent className='w-6 h-6 mb-1 object-cover transform group-hover:scale-110 group-focus:scale-125 md:group-focus:scale-110 transition duration-300 ease-in-out text-white md:w-20 md:h-20 md:mb-2 md:selft-center md:text-[#2B2024] group-hover:text-[#850000] group-focus:text-[#850000] dark:text-gray-400 dark:group-hover:text-blue-500'/> 
                                                            </div>
                                                            <span className="text-sm md:max-w-32 line-clamp-2 font-normal underline underline-offset-2 text-white md:text-md text-center md:font-bold md:tracking-tight md:text-[#2B2024] group-focus:text-black dark:text-gray-400 dark:group-hover:text-blue-500">{item.title}</span>
                                                        </a>
                                                    ) : (
                                                        <Link href={item.link} key={index} className="group min-w-20 w-full md:min-w-60 md:w-fit inline-flex flex-col items-center justify-center focus:ring-0 focus:bg-none md:p-0 md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-[#2B2024] md:focus:ring-2 md:focus:ring-gray-200 md:focus:bg-gray-100">
                                                            <div className="relative overflow-hidden rounded-sm w-full flex justify-center group">
                                                                <IconComponent className='w-6 h-6 mb-1 object-cover transform group-hover:scale-110 group-focus:scale-125 md:group-focus:scale-110 transition duration-300 ease-in-out text-white md:w-20 md:h-20 md:mb-2 md:selft-center md:text-[#2B2024] group-hover:text-[#850000] group-focus:text-[#850000] dark:text-gray-400 dark:group-hover:text-blue-500'/> 
                                                            </div>
                                                            <span className="text-sm md:max-w-32 line-clamp-2 font-normal underline underline-offset-2 text-white md:text-md text-center md:font-bold md:tracking-tight md:text-[#2B2024] group-focus:text-black dark:text-gray-400 dark:group-hover:text-blue-500">{item.title}</span>
                                                        </Link>
                                                )
                                            }
                                    </div>
                            }
                            
                        )
                        )
                    }
            </div>
        </section>
  );
}
