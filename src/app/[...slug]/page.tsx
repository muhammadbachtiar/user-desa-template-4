'use client'
import type { MenuWithContent } from "@/types/menu";
import RichTextContent from "@/components/shared/RichTextContent";
import AsideContent from "@/components/app-layout/aside-content";
import { PageProps } from "../../../.next/types/app/[...slug]/page";
import Refetch from "@/components/shared/refetch";
import useStaticPage from "@/hooks/settings/useStaticPage";
import { use } from "react";
import useSetting from "@/hooks/settings/useSettings";
import Link from "next/link";

function findMenuItemByPath(
  items: MenuWithContent,
  path: string[],
  currentPath = ""
): MenuWithContent[0] | null {
  for (const item of items) {
    const itemPath = item.route ? `${currentPath}${item.route}` : currentPath;

    if (itemPath === `/${path.join("/")}`) {
      return item;
    }

    if (item.child && item.child.length > 0) {
      const found = findMenuItemByPath(item.child, path, itemPath);
      if (found) return found;
    }
  }

  return null;
}

interface DynamicPageProps {
  params: { slug?: string[] };
}

export default function DynamicPage({ params }: DynamicPageProps & PageProps) {
  const unwrappedParams = use(params);
  const { data: menu } = useSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const path = unwrappedParams.slug || [];
  const menuItem = Array.isArray(menu?.value) ? findMenuItemByPath(menu.value, path) : null;
  const { data: staticPage, isLoading, isError, isFetching, refetch } = useStaticPage({}, menuItem?.staticPage || "");
  
   if (!isLoading && !isFetching && !staticPage) {
    return <div className="flex flex-col text-center md:px-12 items-center justify-center h-screen w-full text-gray-700">
         <div className="absolute inset-0 h-[15%] bg-gradient-to-b from-black/25 to-white/5"></div>
              <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
              <Link href="/" className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Kembali ke Beranda
              </Link>
            </div>;
  }

  return (
    <div className="min-h-screen px-3 md:px-12 w-full mt-16 py-4">
      <div className="absolute inset-0 h-[15%] bg-gradient-to-b from-black/25 to-white/5"></div>
        <AsideContent>
          {isLoading || (!staticPage?.content && isFetching) ? (
                <>
                  <div className="animate-pulse space-y-4 p-6">
                    <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-56 w-full bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                      <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </>
          ) : !isError && !isFetching && !staticPage?.content ? (
              <div className="flex col-span-6 w-full h-full justify-center">
                  <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                      <p className="text-black text-2xl dark:text-gray-400 text-center">Data tidak tersedia</p>
                  </div>
              </div>
          ) : isError && !isFetching  ? (
            <div className="flex col-span-6 w-full h-full justify-center">
                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                  <Refetch refetch={refetch} />
                </div>
            </div>
          ) : (
            <RichTextContent content={staticPage.content} className="px-4" />
          )}
        </AsideContent>
      </div>
  );
}