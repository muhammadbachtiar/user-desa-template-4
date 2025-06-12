"use client"

import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import Image from "next/image";
import { BiCopy } from "react-icons/bi";
import { FaFacebook, FaMap, FaTelegram, FaWhatsapp, FaX } from "react-icons/fa6";
import Link from "next/link";
import useEnterpriseDetail from "@/hooks/contents/enterprise/useDetail";

const ArticleDetail = () => {
    const { slug } = useParams();

    const { data: enterprise, isLoading: isLoadingArticle, isFetching: isFetchingArticle, refetch: refetchArticle, isError: isErrorArticle } = useEnterpriseDetail({}, String(slug));

  return (
    <>  
        <div className="min-h-screen w-full">
            {isLoadingArticle ? (
                <></>
            ) : isErrorArticle && !isFetchingArticle && !enterprise || Object.keys(enterprise.value || {}).length === 0 ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorArticle && !isFetchingArticle  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400 text-center">Terjadi kesalahan, silakan ulangi</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                refetchArticle();
                            }}
                        >
                            <LuRefreshCcw size={24} />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                     <div className="flex flex-col min-h-screen gap-y-6">
                        <div className="w-full">
                            <Image
                            src={enterprise.value.thumbnail || "/placeholder.svg"}
                            alt={enterprise.value.title}
                            width={1200}
                            height={600}
                            className="w-full h-[400px] object-cover"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 -mt-6 relative">
                            <div className="w-full md:w-2/3 bg-gray-50 rounded-lg shadow-sm p-6">
                            <div className="flex items-center mb-4">
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {enterprise.value.category.name}
                                </span>
                                {enterprise.value.isVerified && (
                                <div className="ml-3 flex items-center text-green-600">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    <span className="text-sm">Terverifikasi</span>
                                </div>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{enterprise.value.title}</h1>
                            <p className="text-gray-700 mb-8">{enterprise.value.description}</p>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                    />
                                    </svg>
                                </span>
                                Produk & Layanan
                                </h2>
                                <div className="pl-10">
                                {enterprise.value.product.map((item, index) => (
                                    <div key={index} className="mb-2">
                                    <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                    <FaMap className="w-5 h-5 text-blue-600" />
                                </span>
                                Lokasi Usaha
                                </h2>
                                <div className="pl-10">
                                <p className="text-gray-700">{enterprise.value.address}</p>
                                <Link href={enterprise.value.gmap} className="text-blue-600 hover:underline mt-2 inline-block" target="_blank">
                                    Lihat di Google Maps
                                </Link>
                                </div>
                            </div>
                            </div>
                            <div className="w-full md:w-1/3">
                            <div className="bg-gray-50 rounded-lg shadow-sm p-6 mb-4">
                                <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{enterprise.value.ownerName}</h3>
                                    <p className="text-sm text-gray-500">Pemilik UMKM</p>
                                </div>
                                </div>
                                <a
                                href={`https://wa.me/${enterprise.value.waNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors"
                                >
                                <FaWhatsapp className="w-5 h-5 mr-2" />
                                Hubungi via WhatsApp
                                </a>
                            </div>

                            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
                                <h3 className="text-sm uppercase text-gray-500 font-medium mb-4">BAGIKAN UMKM</h3>
                                <div className="flex space-x-2">
                                <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center">
                                    <FaFacebook className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    <FaX className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center">
                                    <FaWhatsapp className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
                                    <FaTelegram className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center">
                                    <BiCopy className="w-5 h-5" />
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
      </div>
    </>
  );
};

export default ArticleDetail;
