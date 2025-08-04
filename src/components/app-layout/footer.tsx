'use client'
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../shared/logo";
import sosmedIcons from "../shared/sosmedIcons";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";

const Footer = () => {
    const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
    return (
       <>
        <footer className="bg-black/90 pb-24 md:pb-6 py-6 w-full flex justify-center">
            <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl relative flex flex-col align-middle justify-center dark:bg-gray-700 dark:border-gray-600">
                <div className="grid grid-cols-4 gap-y-5 items-center justify-start">
                    {
                        isSettingLoading || (isSettingFetching && !setting?.value) ? (
                            <>
                                 <div className="animate-pulse grid col-span-4 lg:col-span-3 grid-cols-4 gap-4 p-6">
                                        <div className="col-span-4 lg:col-span-2 flex flex-col gap-2">
                                            <div className="flex items-center gap-x-2">
                                            <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                            <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                            <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                            <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>

                                    <div className="col-span-4 lg:col-span-2 flex flex-col gap-6">
                                        <div className="w-full flex flex-wrap gap-6 justify-start">
                                            <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                            <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                            <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                            <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : isSettingError && !isSettingFetching  ? (
                            <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                                <Refetch refetch={refetchSetting} />
                            </div>
                        ) : (
                            <div className="col-span-4 lg:col-span-3 flex flex-col">
                                <span className="text-base mb-2 font-bold text-white">Hubungi kami</span>
                                <div className="col-span-4 lg:col-span-2 text-start flex flex-col gap-1">                       
                                    <div className="flex justify-start items-center gap-x-2">
                                        <FaLocationDot className="min-w-4 min-h-4 rounded-sm text-white"></FaLocationDot>
                                        <p className="flex flex-wrap text-sm font-normal mb-0 text-white dark:text-white">{setting?.value?.contactUs?.address || "[Alamat belum diatur]"}</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-x-2">
                                        <FaPhone className="min-w-4 min-h-4 rounded-sm text-white"></FaPhone>
                                        <p className="flex flex-wrap text-sm font-normal mb-0 text-white dark:text-white">{setting?.value?.contactUs?.phone || "[Nomor telepon belum diatur]"}</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-x-2">
                                        <MdEmail className="min-w-4 min-h-4 rounded-sm text-white"></MdEmail>
                                        <p className="flex flex-wrap text-sm font-normal mb-0 text-white truncate dark:text-white">{setting?.value?.contactUs?.email || "[Email belum diatur]"}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="col-span-4 lg:col-span-1 flex flex-col justify-start lg:justify-end gap-4">
                        <Logo/>
                        <div className="flex flex-col">
                            <span className="text-sm mb-2 text-white">Ikuti kami di sosial media</span>
                            <div className="w-full flex flex-wrap gap-6 justify-start">
                                {
                                    setting?.value?.socialMedia ? Object.entries(setting.value.socialMedia as Record<string, { profileUrl: string }>).map(([key, value]) => {
                                    const Icon = sosmedIcons[key] ?? sosmedIcons.FaQuestion; 
                                        return (
                                            <a 
                                                key={key} 
                                                href={`${value.profileUrl}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex justify-items-center w-fit items-center p-3 lg:p-1 bg-white hover:bg-gray-300 rounded-full group focus:ring-2 focus:ring-white transition-all transform duration-300 ease-in-out"
                                            >
                                                <Icon className="w-6 h-6 rounded-sm font-bold text-black" />
                                            </a>
                                        );
                                    }) : <p className="text-white text-center text-md dark:text-gray-400">[Sosial Media belum di atur]</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>  
                <hr className="my-3 block border-gray-600 sm:mx-auto dark:border-gray-700 lg:my-4" />
                <span className="block text-sm font-semibold text-center text-white sm:text-center dark:text-gray-400">© 2025 <a href="https://muaraenimkab.go.id/" className="hover:underline">Muara Enim™</a>. All Rights Reserved.</span>
            </div>
        </footer>
       </>
  );
};

export default Footer;