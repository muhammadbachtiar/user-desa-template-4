import SliderCard from '../shared/sliderEnterprise';
import Link from 'next/link';
import useSetting from "@/hooks/settings/useSettings";

export default function Enterprise() {

  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting("enterprise", {});

  return (
    <section className="relative w-full flex justify-center items-center">
        <div className="max-w-full w-full grid grid-cols-8 gap-6 bg-white py-5 dark:bg-gray-700 dark:border-gray-600 ">
          <div className="col-span-8 grid grid-cols-6 gap-8 justify-between">
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
                    <div className="col-span-6 md:col-span-4 flex flex-col justify-start">
                        <h2 className="self-start text-md tracking-tighter font-semibold uppercase text-blue-700">{setting.value.title}</h2>
                        <p className="self-start text-md font-normal text-black">{setting.value.description}</p>
                    </div>
                )
            }
              <div className="col-span-6 md:col-span-2 text-start md:text-end">
                  <Link href={"/enterprise"} className="inline-flex font-medium items-center text-center text-blue-700 hover:text-blue-400 rounded-xl px-4 py-2 border-2 border-blue-300 hover:underline hover:bg-blue-100 focus:text-blue-500 focus:underline">
                      Lihat Semua
                      <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                      </svg>
                  </Link>
              </div>
          </div>
          <div className="col-span-8 grid grid-cols-4 h-full w-full font-medium md:gap-x-4 justify-center justify-items-center">
              <div className="col-span-4 max-w-full w-full overflow-hidden dark:bg-gray-800 dark:border-gray-700"><SliderCard/></div>
          </div>
        </div>
    </section>
  );
}
