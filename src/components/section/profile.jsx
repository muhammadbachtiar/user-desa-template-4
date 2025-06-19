'use client'
import useStaticPage from '@/hooks/settings/useStaticPage';
import RichTextContent from '../shared/RichTextContent';
import TabGroup from '../shared/TabGroup';
import Refetch from '../shared/refetch';

export default function Profile() {

  const { data: welcomeMessage, isLoading: isWellcomeMessageLoading, isFetching: isWellcomeMessageFetching, refetch: refetchWelcomeMessage, isError: isWellcomeMessageError } = useStaticPage({}, `wellcome-message-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
  const { data: villageProgram, isLoading: isvillageProgramLoading, isFetching: isvillageProgramFetching, refetch: refetchVillageProgram, isError: isvillageProgramError } = useStaticPage({}, `village-program-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
  
  const TabListName = [
    {
      name: 'Kata Sambutan',
      content: <div style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="rounded-2xl border-2 border-[#EDEDED] min-h-[400px] max-h-screen overflow-y-scroll flex flex-col items-center space-y-6">
                  {isvillageProgramLoading || isvillageProgramFetching && !welcomeMessage ? (
                         <div className="flex animate-pulse col-span-8 w-full">
                            <div className="h-[400px] w-full flex-1 rounded-2xl bg-gray-200"></div>
                         </div>
                    ) : !isWellcomeMessageError && !isvillageProgramFetching && !welcomeMessage? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-2xl dark:text-gray-400 text-center">Kata sambutan tidak tersedia</p>
                            </div>
                        </div>
                    ) : isWellcomeMessageError && !isvillageProgramFetching  ? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                          <Refetch refetch={refetchWelcomeMessage} />
                        </div>
                    ) : (
                      <RichTextContent 
                        content={welcomeMessage?.content ?? 'Kata sambutan tidak tersedia'} 
                        className="px-4 py-4 md:px-16" 
                      />
                    )}
              </div>
    },
    {
      name: 'Program',
      content: <div style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className=" border-2 border-[#EDEDED] rounded-2xl min-h-[400px]  max-h-screen overflow-y-scroll">
                    {isWellcomeMessageLoading || isvillageProgramFetching && !villageProgram? (
                        <div className="flex animate-pulse col-span-8 w-full">
                            <div className="h-[400px] w-full flex-1 rounded-2xl bg-gray-200"></div>
                         </div>
                    ) : !isvillageProgramError && !isWellcomeMessageFetching && !villageProgram  ? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-2xl dark:text-gray-400 text-center">Program tidak tersedia</p>
                            </div>
                        </div>
                    ) : isvillageProgramError && !isWellcomeMessageFetching  ? (
                        <div className="flex col-span-6 w-full min-h-[400px] justify-center">
                          <Refetch refetch={refetchVillageProgram} />
                        </div>
                    ) : (
                      <RichTextContent 
                        content={villageProgram?.content ?? 'Program tidak tersedia'} 
                        className="px-4 py-4 md:px-16" 
                      />
                    )}
              </div>
    }
  ]

  return (
    <section className="relative w-full max-w-11/12 flex justify-center items-center">
      <div className="max-w-full w-full flex flex-col align-middle justify-center bg-white dark:bg-gray-700 dark:border-gray-600">
          <TabGroup tabList={TabListName}/>
      </div>
    </section>
  );
}
