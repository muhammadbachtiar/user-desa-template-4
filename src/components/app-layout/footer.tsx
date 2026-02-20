'use client'
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../shared/logo";
import sosmedIcons from "../shared/sosmedIcons";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";

const Footer = () => {
    const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
    
    // Fallback logic for coordinates: check contactUs first, then root level
    const lat = setting?.value?.contactUs?.latitude || setting?.value?.latitude;
    const lng = setting?.value?.contactUs?.longitude || setting?.value?.longitude;
    const hasCoordinates = lat && lng;
    const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

    return (
       <>
        <footer className="bg-black/90 pb-24 md:pb-6 py-10 w-full flex justify-center text-white">
            <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl relative flex flex-col align-middle justify-center dark:bg-gray-700 dark:border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-start">
                    {
                        isSettingLoading || (isSettingFetching && !setting?.value) ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-4 animate-pulse grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col gap-4">
                                     <div className="h-12 w-48 bg-gray-700 rounded"></div>
                                     <div className="h-48 w-full bg-gray-700 rounded-lg"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                     <div className="h-6 w-32 bg-gray-700 rounded"></div>
                                     <div className="h-4 w-full bg-gray-700 rounded"></div>
                                     <div className="h-4 w-full bg-gray-700 rounded"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                     <div className="h-6 w-32 bg-gray-700 rounded"></div>
                                     <div className="flex gap-4">
                                        <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                                        <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                                     </div>
                                </div>
                            </div>
                        ) : isSettingError && !isSettingFetching  ? (
                            <div className="flex min-h-52 justify-center items-center mb-4 col-span-1 md:col-span-2 lg:col-span-4 w-full">
                                <Refetch refetch={refetchSetting} />
                            </div>
                        ) : (
                            <>
                                {/* Kolom 1: Logo & Map */}
                                <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-4">
                                    <Logo/>
                                    {hasCoordinates && gmapsApiKey && (
                                        <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                src={`https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${lat},${lng}&zoom=15`}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="Lokasi Kantor Desa"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>

                                {/* Kolom 2: Kontak */}
                                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-4 lg:pl-8">
                                    <h3 className="text-lg font-bold mb-2 border-b-2 border-primary/50 inline-block w-fit pb-1">Hubungi Kami</h3>
                                    <div className="flex flex-col gap-4">                       
                                        <div className="flex items-start gap-x-3 group">
                                            <div className="mt-1 p-2 bg-gray-800 rounded-lg group-hover:bg-primary transition-colors">
                                                <FaLocationDot className="w-4 h-4 text-white"/>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Alamat</span>
                                                {hasCoordinates ? (
                                                    <a 
                                                        href={`https://www.google.com/maps?q=${lat},${lng}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-medium text-gray-200 hover:text-white hover:underline transition-colors leading-relaxed"
                                                    >
                                                        {setting?.value?.contactUs?.address || "[Alamat belum diatur]"}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm font-medium text-gray-200 leading-relaxed">
                                                        {setting?.value?.contactUs?.address || "[Alamat belum diatur]"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-x-3 group">
                                            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-primary transition-colors">
                                                <FaPhone className="w-4 h-4 text-white"/>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Telepon</span>
                                                <a 
                                                    href={`tel:${setting?.value?.contactUs?.phone}`}
                                                    className="text-sm font-medium text-gray-200 hover:text-white hover:underline transition-colors"
                                                >
                                                    {setting?.value?.contactUs?.phone || "[Nomor telepon belum diatur]"}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-x-3 group">
                                            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-primary transition-colors">
                                                <MdEmail className="w-4 h-4 text-white"/>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email</span>
                                                <a 
                                                    href={`mailto:${setting?.value?.contactUs?.email}`}
                                                    className="text-sm font-medium text-gray-200 hover:text-white hover:underline transition-colors truncate max-w-[200px] sm:max-w-xs"
                                                >
                                                    {setting?.value?.contactUs?.email || "[Email belum diatur]"}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Kolom 3: Sosmed */}
                                <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col gap-4">
                                    <h3 className="text-lg font-bold mb-2 border-b-2 border-primary/50 inline-block w-fit pb-1">Ikuti Kami</h3>
                                    <p className="text-sm text-gray-400 mb-2">Dapatkan informasi terbaru melalui media sosial kami.</p>
                                    <div className="flex flex-wrap gap-3">
                                        {
                                            setting?.value?.socialMedia ? Object.entries(setting.value.socialMedia as Record<string, { profileUrl: string }>).map(([key, value]) => {
                                            const Icon = sosmedIcons[key] ?? sosmedIcons.FaQuestion; 
                                                return (
                                                    <a 
                                                        key={key} 
                                                        href={`${value.profileUrl}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="flex justify-center items-center w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg transition-all duration-300 group"
                                                        aria-label={key}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                    </a>
                                                );
                                            }) : <p className="text-gray-400 text-sm">[Sosial Media belum di atur]</p>
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>  
                
                <hr className="my-8 border-gray-800" />
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <span className="text-center md:text-left">© {new Date().getFullYear()} <a href="https://muaraenimkab.go.id/" className="hover:text-white transition-colors decoration-slice">Pemerintah Kabupaten Muara Enim</a>.</span>
                    <span className="text-center md:text-right">Hak Cipta Dilindungi.</span>
                </div>
            </div>
        </footer>
       </>
  );
};

export default Footer;