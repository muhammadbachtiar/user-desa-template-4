"use client"
import Link from "next/link";
import Image from "next/image";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "./refetch";

export default function Logo() {
  const { data: logo, isLoading, refetch, isFetching, isError } = useSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  
  return ( 
    <>
      {   
          isLoading ? (
            <div className="flex  animate-pulse space-x-3">
              <div className="size-12 rounded-2xl bg-gray-200"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-3 h-3 w-24 rounded bg-gray-200"></div>
                      <div className="col-span-3 h-2 w-24 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
          ) : isError && !isFetching  ? (
            <Refetch refetch={refetch} />
          ) : (
              <>       
                <Link href={"/"} className={`flex items-center py-1 space-x-3 rtl:space-x-reverse rounded-md hover:backdrop-blur-sm hover:scale-105 transition transform duration-300 ease-in-out`}>
                    <Image
                        className="h-1 mx-1"
                        src={logo?.value?.imageUrl ?? '/images/unavailable-image.png'}
                        alt="Logo"
                        width={500}
                        height={300}
                        style={{
                          width: "38px",
                          height: "auto",
                        }}
                      />
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <span className={`self-center align-baseline text-md leading-3 tracking-tighter font-semibold uppercase text-white`}>{ logo?.value?.regionEntity ?? "[Judul logo belum diatur]"} </span>
                        <span className={`self-center align-baseline text-xs leading-3 font-extralight text-white`}>{ logo?.value?.regionDescription ?? "[Sub judul logo belum diatur]"} </span>
                    </div>
                </Link>
              </>
          )
      }
    </>
    
  );
}
