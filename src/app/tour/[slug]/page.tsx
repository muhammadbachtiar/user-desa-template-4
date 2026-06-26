"use client";

import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import useTourDetail from "@/hooks/contents/tour/useDetail";
import { CgMail } from "react-icons/cg";
import { BiGlobe } from "react-icons/bi";
import { CiMap } from "react-icons/ci";
import sosmedIcons from "@/components/shared/sosmedIcons";
import StreetViewChecker from "@/services/utils/checkStreetView";
import Link from "next/link";
import { validateAndRedirect } from "@/services/utils/shouldRedirect";
import { GoogleMapsEmbed } from "@/components/shared/GoogleMapsEmbed";

const TourDetail = () => {
  const { slug } = useParams();
  const { data: tour, isLoading } = useTourDetail({}, String(slug));
  const isStreetAvailable = StreetViewChecker({
    lat: Number(tour?.latitude),
    lng: Number(tour?.longitude),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center w-full mt-24 sm:mt-16 py-4">
        <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
        <div className="w-full px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl z-10">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-y-0 h-full animate-pulse">
            <div className="lg:col-span-6 lg:sticky lg:top-0 lg:h-screen">
              <div className="h-full w-full flex items-start justify-center">
                <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[500px] rounded-xl bg-gray-300"></div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:overflow-y-auto">
              <div className="flex flex-col gap-y-4 sm:gap-y-6">
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-300"></div>

                <div className="space-y-2">
                  <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/5 bg-gray-300 rounded"></div>
                </div>

                <div className="h-5 w-full bg-gray-300 rounded"></div>
                <div className="h-5 w-11/12 bg-gray-300 rounded"></div>
                <div className="h-5 w-10/12 bg-gray-300 rounded"></div>

                <div className="flex flex-wrap gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-md bg-gray-300"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (tour) {
    return (
      <>
        <div className="min-h-screen flex justify-center w-full mt-24 sm:mt-16 py-4">
          <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
          <div className="w-full px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl z-10">
            <div className="flex-1 grid grid-cols-1 gap-4 lg:grid-cols-12 h-full">
              {/* Map Section */}
              <div className="lg:col-span-6 lg:sticky top-0 lg:h-screen order-2 lg:order-1">
                <div className="h-full w-full flex items-start justify-center">
                  <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[500px] rounded-xl overflow-hidden">
                    <GoogleMapsEmbed
                      latitude={tour?.latitude}
                      longitude={tour?.longitude}
                      mode={isStreetAvailable ? "streetview" : "place"}
                      title={`Map of ${tour?.title}`}
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-6 lg:overflow-y-auto order-1 lg:order-2">
                <div className="flex flex-col gap-y-4 sm:gap-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-1 sm:mb-2">
                      {tour?.title}
                    </h1>
                    <div className="flex items-center">
                      <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                        {tour?.address}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                    <Image
                      className="object-cover"
                      src={tour?.thumbnail || "/placeholder.svg"}
                      alt="Tour Thumbnail"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Links */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {tour?.link?.gmap && (
                      <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                        <CiMap className="w-4 h-4 sm:w-5 sm:h-5 text-[#B90B0B]" />
                        <a
                          href={tour?.link?.gmap || ""}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-gray-900 dark:text-white hover:font-bold transition-all"
                        >
                          Lokasi
                        </a>
                      </div>
                    )}
                    {tour?.link?.website && (
                      <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                        <BiGlobe className="w-4 h-4 sm:w-5 sm:h-5 text-[#B90B0B]" />
                        <a
                          href={`https://${tour?.link.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-gray-900 dark:text-white hover:font-bold transition-all truncate max-w-[200px] sm:max-w-none"
                        >
                          {tour?.link?.website || "[Website tidak tersedia]"}
                        </a>
                      </div>
                    )}
                    {tour?.link?.email && (
                      <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                        <CgMail className="w-4 h-4 sm:w-5 sm:h-5 text-[#B90B0B]" />
                        <a
                          href={`mailto:${tour?.link?.email || ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-gray-900 dark:text-white hover:font-bold transition-all truncate max-w-[200px] sm:max-w-none"
                        >
                          {tour?.link?.email ?? "[Email tidak tersedia]"}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tour?.description}
                  </p>

                  {/* Social Media */}
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {tour?.link?.sosmed &&
                      Object.entries(tour?.link?.sosmed).map(([key, value]) => {
                        const Icon = sosmedIcons[value.key];
                        return (
                          <a
                            key={key}
                            href={`https://${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gray-500 hover:bg-[#F3F9FB] group transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out"
                          >
                            {Icon ? (
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-900" />
                            ) : (
                              <span className="text-xs sm:text-sm">{key}</span>
                            )}
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (validateAndRedirect([typeof slug === "string" ? slug : "*"])) {
    return redirect("/tour");
  }
  return (
    <div className="flex flex-col text-center items-center justify-center mt-24 sm:mt-16 h-96 w-full text-gray-700">
      <div className="absolute inset-0 h-[11%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
      <h1 className="text-2xl sm:text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-sm sm:text-lg">Halaman yang kamu cari tidak ditemukan.</p>
      <Link
        href="/"
        className="mt-4 px-4 sm:px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default TourDetail;
