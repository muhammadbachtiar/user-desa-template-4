'use client'
import TabGroupCard from "@/components/shared/TabGroup";
import BasicInformation from "@/components/modul/profile/basic-information";
import Structure from "@/components/modul/profile/structure";
import VisiMisi from "@/components/modul/profile/visi-misi";
import History from "@/components/modul/profile/history";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "@/components/shared/refetch";


export default function Home() {

const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`profile-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundColor: '#f3f4f6' };

const tabList = [
    {
        name: 'Informasi Umum',
        content: <BasicInformation/>
    },
    {
        name: 'Struktur Pemerintahan',
        content: <Structure/>
    },
    {
        name: 'Visi & Misi',
        content: <VisiMisi/>
    },
    {
        name: 'Sejarah',
        content: <History/>
    }
]

  return (
      <>
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
                <section style={backgroundStyle} className={`relative rounded-md p-4 lg:p-8 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end`}>
                    <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                    <div className="relative z-10 px-0 sm:px-8  text-start">
                        <h2 className="mb-2 text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting.value.title}</h2>
                        <p className="sm:mb-2 text-sm sm:text-md font-light tracking-tight text-white">{setting.value.description}</p>
                    </div>
                </section>
            )
        }
        <div className="w-full">
            <div className="flex flex-col w-full">
              <TabGroupCard tabList={tabList}/>
            </div>
        </div>
      </>
  );
}
