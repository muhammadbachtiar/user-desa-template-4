'use client'
import { FaHome, FaMailBulk } from "react-icons/fa";
import { FaBuilding, FaGlobe, FaMapPin, FaPhone } from "react-icons/fa6";
import HeadingBadge from "../../shared/headingBadge";
import Image from "next/image";
import useStaticPage from "@/hooks/settings/useStaticPage";
import RichTextContent from "../../shared/RichTextContent";
import Refetch from "../../shared/refetch";


const BasicInformation = () => {
  
   const { data: welcomeMessage, isLoading: isWellcomeMessageLoading, isFetching: isWellcomeMessageFetching, refetch: refetchWelcomeMessage, isError: isWellcomeMessageError } = useStaticPage({}, `wellcome-message-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
    const { data: villageProgram, isLoading: isvillageProgramLoading, isFetching: isvillageProgramFetching, refetch: refetchVillageProgram, isError: isvillageProgramError } = useStaticPage({}, `village-program-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);

    return (
        <div className="w-full dark:bg-gray-700 rounded-2xl min-h-[400px] flex flex-col items-start space-y-6">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                    <HeadingBadge title="Tentang Desa"/>
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 mb-4">
                                <Image
                                    src="/images/Lambang-Kabupaten-Muara-Enim-Sumatera-Selatan.png"
                                    alt="Logo Desa Kedungwungu"
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Desa Kedungwungu</h3>
                            <p className="text-gray-500 text-sm">Kecamatan Krangkeng, Kabupaten Indramayu</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center mb-4">
                            <div className="w-1 h-5 bg-blue-500 rounded-full mr-2"></div>
                            <h3 className="font-semibold text-blue-700">Informasi Desa</h3>
                            </div>

                            <div className="space-y-4">
                            <div className="flex">
                                <div className="w-1/2">
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                    <FaHome size={14} className="mr-1 text-blue-500" />
                                    Nama Desa
                                </p>
                                <p className="text-sm font-medium">Desa Kedungwungu</p>
                                </div>
                                <div className="w-1/2">
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                    <FaMapPin size={14} className="mr-1 text-blue-500" />
                                    Kecamatan
                                </p>
                                <p className="text-sm font-medium">Kecamatan Krangkeng</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-1/2">
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                    <FaBuilding size={14} className="mr-1 text-blue-500" />
                                    Kabupaten
                                </p>
                                <p className="text-sm font-medium">Kabupaten Indramayu</p>
                                </div>
                                <div className="w-1/2">
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                    <FaMapPin size={14} className="mr-1 text-blue-500" />
                                    Provinsi
                                </p>
                                <p className="text-sm font-medium">Jawa Barat</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                <FaMapPin size={14} className="mr-1 text-blue-500" />
                                Kode Pos
                                </p>
                                <p className="text-sm font-medium">45258</p>
                            </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center mb-4">
                            <div className="w-1 h-5 bg-blue-500 rounded-full mr-2"></div>
                            <h3 className="font-semibold text-blue-700">Kontak & Alamat</h3>
                            </div>

                            <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                <FaPhone size={14} className="mr-1 text-blue-500" />
                                Telepon
                                </p>
                                <p className="text-sm font-medium text-blue-600">0234-5678901</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                <FaMailBulk size={14} className="mr-1 text-blue-500" />
                                Email
                                </p>
                                <p className="text-sm font-medium text-blue-600">desa-kedungwungu@indramayu.desa.id</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                <FaGlobe size={14} className="mr-1 text-blue-500" />
                                Website
                                </p>
                                <a href="https://kedungwungu.desa.id" className="text-sm font-medium text-blue-600 hover:underline">
                                https://kedungwungu.desa.id
                                </a>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 flex items-center mb-1">
                                <FaMapPin size={14} className="mr-1 text-blue-500" />
                                Alamat Kantor Desa
                                </p>
                                <p className="text-sm font-medium">
                                Jl. Raya Kedungwungu No. 123, Kecamatan Krangkeng, Kabupaten Indramayu
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="relative rounded-xl">
                        <div className="aspect-[16/9] relative">
                            <Image
                            src="/images/muara-enim-skyline.jpg"
                            alt="Pemandangan Desa Kedungwungu"
                            fill
                            className="object-cover"
                            />
                        </div>
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                    <HeadingBadge title="Kata Sambuatan"/>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl min-h-[400px] flex flex-col items-center space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 p-6 ">
                        <div className="flex-shrink-0">
                        <Image
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ease-in-out"
                            src={welcomeMessage.value.profile?.imageUrl || 'https://via.placeholder.com/150'}
                            alt={`${welcomeMessage.value.profile?.name}'s photo`}
                            width={160}
                            height={160} 
                            sizes="(max-width: 768px) 128px, 160px"
                            priority 
                        />
                        </div>
                        <div className="flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {welcomeMessage.value.profile?.name}
                        </h3>
                        <p className="text-lg font-medium text-blue-600 dark:text-blue-300 mt-1">
                            {welcomeMessage.value.profile?.jabatan}
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400 mt-2 italic">
                            {welcomeMessage.value.profile?.years}
                        </p>
                        </div>
                    </div>
                    {isWellcomeMessageLoading ? (
                        <></>
                    ) : isvillageProgramError && !isWellcomeMessageFetching && !villageProgram || !villageProgram ? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
                            </div>
                        </div>
                    ) : isvillageProgramError && !isWellcomeMessageFetching  ? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                          <Refetch refetch={refetchWelcomeMessage} />
                        </div>
                    ) : (
                        <RichTextContent 
                            content={welcomeMessage.value.content} 
                            className="px-4 md:px-16" 
                        />
                    )}
                </div>
            </div>
            <div>
                <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                    <HeadingBadge title="Program Kerja"/>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl min-h-[400px] flex flex-col py-4 items-center space-y-6">
                {isvillageProgramLoading ? (
                         <></>
                    ) : isWellcomeMessageError && !isvillageProgramFetching && !welcomeMessage || !welcomeMessage? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
                            </div>
                        </div>
                    ) : isWellcomeMessageError && !isvillageProgramFetching  ? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                          <Refetch refetch={refetchVillageProgram} />
                        </div>
                    ) : (
                        <RichTextContent 
                            content={villageProgram.value.content} 
                            className="px-4 md:px-16" 
                        />
                    )}
                </div>
            </div>
        </div>
  );
};

export default BasicInformation;