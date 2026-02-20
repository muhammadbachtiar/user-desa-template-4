"use client"
import Link from 'next/link';
import { validateAndRedirect } from '@/services/utils/shouldRedirect';
import { redirect, useParams } from 'next/navigation';
import SliderCard from '@/components/shared/sliderImage';
import moment from 'moment';
import 'moment/locale/id';
import DownloadButton from '@/components/shared/DownloadButton';
import usePressReleaseDetail from '@/hooks/contents/press-release/useDetail';
import { cleanContent } from '@/services/utils/cleanContent';
import AsideContent from '@/components/app-layout/aside-content';
import RichTextContent from '@/components/shared/RichTextContent';
import { BiCalendar } from 'react-icons/bi';
import Image from 'next/image';

export default function Page() {
  const { slug }: { slug: string } = useParams();
  const { data: pressRelease, isLoading } = usePressReleaseDetail({ with: "category,attachments" }, slug);

  try {
    const rawDescription = pressRelease?.content || "";
    const paragraphs = cleanContent(rawDescription);
    const contentImageUrl: { title: string; link: string }[] = [];

    if (pressRelease?.thumbnail) {
      contentImageUrl.push({
        title: "Thumbnail",
        link: pressRelease.thumbnail
      });
    }
    const imgTagMatches = pressRelease?.content?.match(/<img[^>]+src="([^">]+)"/gi) || [];

    imgTagMatches.forEach((imgTag, index) => {
      const srcMatch = imgTag.match(/src="([^">]+)"/i);
      if (srcMatch && srcMatch[1]) {
        contentImageUrl.push({
          title: `Image ${index + 1} from content`,
          link: srcMatch[1]
        });
      }
    });

    pressRelease?.attachments?.forEach((attachment, index) => {
      contentImageUrl.push({
        title: attachment?.original_name || `Attachment ${index + 1} from content`,
        link: attachment.url
      });
    })

    return (
      <div className="min-h-screen flex justify-center mt-24 sm:mt-16 w-full">
                <div className="absolute inset-0 h-[10%] bg-gradient-to-b from-black/25 to-white/5 z-0"></div>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <AsideContent>
            {isLoading ? (
              <div className="flex flex-col pr-3 my-2 gap-y-1 min-h-screen bg-white animate-pulse">
                <span className="self-start align-baseline h-4 w-32 bg-gray-200 rounded"></span>
                <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
                <span className="self-start align-baseline h-4 w-40 bg-gray-200 rounded"></span>
                <div className="relative w-full group mb-6">
                  <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
                <div className="space-y-2 px-0 md:px-4">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col pr-3 my-2 gap-y-1 min-h-screen bg-white">
                {/* Category */}
                <span className="self-start align-baseline text-base font-semibold text-[#929AAB]">
                  {pressRelease?.category?.name ?? "Siaran Pers"}
                </span>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl text-start font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                  {pressRelease?.title ?? "Artikel Tidak Ditemukan"}
                </h1>

                {/* Date */}
                <div className="flex flex-row justify-start items-center gap-1 mb-4">
                  <BiCalendar className="h-4 w-4 mr-1" />
                  <span>{moment(pressRelease?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY')}</span>
                </div>

                {/* Thumbnail */}
                {pressRelease?.thumbnail && (
                  <div className="relative w-full group mb-6">
                    <Image
                      className="w-full max-h-96 rounded-sm shadow-lg object-cover"
                      src={pressRelease.thumbnail || "/placeholder.svg"}
                      alt="Press Release Thumbnail"
                      width={1200}
                      height={720}
                      priority
                      style={{
                        aspectRatio: '16/9',
                      }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                  </div>
                )}

                {/* Content */}
                <RichTextContent content={pressRelease?.content || ""} />

                {/* Image Slider */}
                {contentImageUrl.length > 0 && (
                  <div className="mt-6">
                    <SliderCard data={contentImageUrl} slideToShow={3} />
                  </div>
                )}

                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-1 text-gray-600">
                    <p className='text-lg font-bold text-gray-900'>Dinas Kominfo SP Pemkab Muara Enim</p>
                    <p>Website: <a href="https://muaraenimkab.go.id/press-release" className="text-blue-500 hover:underline">muaraenimkab.go.id/press-release</a></p>
                    <p>Facebook: Pemkab Muara Enim</p>
                    <p>Instagram: <a href="https://instagram.com/pemkab_muaraenim" className="text-blue-500 hover:underline">@pemkab_muaraenim</a></p>
                  </div>
                </div>

                {/* Author */}
                <div className="flex flex-row w-full my-3 gap-1 justify-items-start justify-end">
                  <div className="flex flex-row">
                    <p className="text-gray-500 dark:text-gray-400">
                      <strong className="font-semibold text-gray-900 dark:text-white">{pressRelease?.user?.name}</strong>
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <DownloadButton article={pressRelease} paragraphs={paragraphs} contentImageUrl={contentImageUrl} />
              </div>
            )}
          </AsideContent>
        </div>
      </div>
    );
  } catch {
    if (validateAndRedirect([slug])) {
      return redirect('/press-release');
    }
    return (
      <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
        <Link href="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }
}