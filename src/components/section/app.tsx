'use client'

import { useState, ReactNode } from 'react';
import Icons from '../shared/icons';
import Link from 'next/link';
import Image from 'next/image';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import useFeatureFlags from '@/hooks/settings/useFeatureFlags';

// ─── Types ───
interface ChildServiceItem {
  id?: string | number;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  link?: string;
  order?: number;
}

interface ServiceItem {
  id?: string | number;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  link?: string;
  order?: number;
  child?: ChildServiceItem[];
}

// ─── Animation variants ───
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: 'easeOut' as const },
  }),
};

// ─── Desktop Service Card ───
function DesktopServiceCard({ item, onClick, index = 0 }: { item: ServiceItem; onClick?: (item: ServiceItem) => void; index?: number }) {
  const IconComponent = Icons[item.icon as keyof typeof Icons] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const hasChildren = Array.isArray(item.child) && item.child.length > 0;

  const cardContent = (
    <div className="group flex flex-col items-center justify-start gap-1.5 py-4 px-3 rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer w-full h-full min-w-[130px] max-w-[180px]">
      {/* Icon / Image */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
        {hasImage ? (
          <Image src={item.image!} alt={item.title} fill sizes="64px" className="object-cover" />
        ) : (
          <IconComponent className="w-8 h-8 text-[#2B2024] dark:text-gray-300 group-hover:text-[#850000] transition-colors duration-200" />
        )}
      </div>

      {/* Title */}
      <span className="text-sm font-bold text-[#2B2024] dark:text-gray-200 text-center line-clamp-2 leading-tight max-w-[150px] tracking-tight">
        {item.title}
      </span>

      {/* Description */}
      <span className="text-[11px] text-gray-500 dark:text-gray-400 text-center line-clamp-2 leading-snug max-w-[150px]">
        {item.description || `Informasi tentang ${item.title}`}
      </span>
    </div>
  );

  const wrapper = (children: ReactNode) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center"
    >
      {children}
    </motion.div>
  );

  if (hasChildren) {
    return wrapper(
      <button type="button" onClick={() => onClick?.(item)} className="focus:outline-none">
        {cardContent}
      </button>
    );
  }

  if (item.link?.startsWith('http')) {
    return wrapper(
      <a href={item.link} target="_blank" rel="noopener noreferrer">{cardContent}</a>
    );
  }

  return wrapper(
    <Link href={item.link || '/'}>{cardContent}</Link>
  );
}

// ─── Mobile bottom bar item (preserving maroon style) ───
function MobileBarItem({ item, onClick, isLast }: { item: ServiceItem; onClick?: (item: ServiceItem) => void; isLast: boolean }) {
  const IconComponent = Icons[item.icon as keyof typeof Icons] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const hasChildren = Array.isArray(item.child) && item.child.length > 0;

  const content = (
    <div className={`group flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-2 px-1.5 ${!isLast ? 'border-r border-white/20' : ''}`}>
      <div className="relative flex items-center justify-center w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
        {hasImage ? (
          <Image src={item.image!} alt={item.title} fill sizes="20px" className="object-cover rounded-full" />
        ) : (
          <IconComponent className="w-4 h-4 text-white group-hover:text-white/80 transition-colors" />
        )}
      </div>
      <span className="text-[10px] font-light text-white text-center line-clamp-1 leading-tight max-w-[52px]">
        {item.title}
      </span>
    </div>
  );

  if (hasChildren) {
    return (
      <button type="button" onClick={() => onClick?.(item)} className="focus:outline-none">
        {content}
      </button>
    );
  }

  if (item.link?.startsWith('http')) {
    return <a href={item.link} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return <Link href={item.link || '/'}>{content}</Link>;
}

// ─── Modal child card (re-uses desktop style) ───
function ModalChildCard({ item, index = 0 }: { item: ChildServiceItem; index?: number }) {
  const IconComponent = Icons[item.icon as keyof typeof Icons] ?? Icons.FaQuestion;
  const hasImage = !!item.image;

  const cardContent = (
    <div className="group flex flex-col items-center justify-start gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer w-full h-full min-h-[110px]">
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-200/60 dark:bg-gray-700 flex-shrink-0">
        {hasImage ? (
          <Image src={item.image!} alt={item.title} fill sizes="48px" className="object-cover" />
        ) : (
          <IconComponent className="w-6 h-6 text-[#2B2024] dark:text-gray-300 group-hover:text-[#850000] transition-colors" />
        )}
      </div>
      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center line-clamp-2 leading-tight max-w-[120px]">
        {item.title}
      </span>
      {item.description && (
        <span className="text-[10px] text-gray-500 dark:text-gray-400 text-center line-clamp-2 leading-snug max-w-[130px]">
          {item.description}
        </span>
      )}
    </div>
  );

  const wrapper = (children: ReactNode) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {children}
    </motion.div>
  );

  if (item.link?.startsWith('http')) {
    return wrapper(
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">{cardContent}</a>
    );
  }

  return wrapper(
    <Link href={item.link || '/'} className="w-full">{cardContent}</Link>
  );
}

// ─── Helper: Filter Services ───
function filterServicesByFeatures(
  services: ServiceItem[],
  features: { tour: boolean; pressRelease: boolean }
): ServiceItem[] {
  const isRouteMatch = (link: string | undefined, target: string): boolean => {
    if (!link) return false;
    // Normalized check: ensure it starts with / for local routes comparison
    // If the link is full url, it won't match anyway which is correct
    const normalized = link.startsWith('/') ? link : `/${link}`;
    return normalized === target || link === target; 
  };

  return services.filter((service) => {
    if (isRouteMatch(service.link, "/tour") && !features.tour) return false;
    if (isRouteMatch(service.link, "/press-release") && !features.pressRelease) return false;
    return true;
  });
}

// ─── Main Component ───
export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const { data, isLoading, isFetching, refetch, isError } = useSetting(`service-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: appSetting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`app-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { isSectionEnabled, pressRelease } = useFeatureFlags();

  const rawServices: ServiceItem[] = (Array.isArray(data?.value) ? data.value : []).sort((a: ServiceItem, b: ServiceItem) => (a.order ?? 0) - (b.order ?? 0));

  const services = filterServicesByFeatures(rawServices, {
    tour: isSectionEnabled("tour"),
    pressRelease: pressRelease,
  });

  const handleOpenModal = (item: ServiceItem) => setSelectedService(item);
  const handleCloseModal = () => setSelectedService(null);

  const showSkeleton = isLoading || (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) && isFetching;
  const showEmpty = !isError && !isFetching && services.length === 0;
  const showError = isError && !isFetching;

  return (
    <>
      <section className="w-full flex justify-center">
        <div className="flex rounded-md mb-2 max-w-11/12 w-full justify-center bg-[#850000] md:py-2 fixed bottom-0 z-10 dark:bg-gray-700 dark:border-gray-600 my-0 md:my-4 md:static md:flex-col md:items-center md:gap-2 md:bg-transparent md:border-0">

          {/* ─── Header (Desktop only) ─── */}
          <div className="hidden md:flex flex-col gap-2 min-h-16 mb-4 items-center w-full">
            {isSettingLoading ? (
              <div className="flex animate-pulse space-x-3">
                <div className="flex flex-col justify-center items-center gap-y-6">
                  <div className="h-8 w-30 rounded bg-gray-200"></div>
                  <div className="h-4 w-36 rounded bg-gray-200"></div>
                </div>
              </div>
            ) : isSettingError && !isSettingFetching ? (
              <Refetch refetch={refetchSetting} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-1"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-[#2B2024] dark:text-white text-center line-clamp-2 max-w-3xl">
                  {appSetting?.value?.title ?? "[Judul layanan belum diatur]"}
                </h2>
                <p className="text-sm md:text-base lg:text-lg font-medium text-gray-500 dark:text-gray-400 text-center line-clamp-2 max-w-2xl">
                  {appSetting?.value?.subTitle ?? "[Sub judul layanan belum diatur]"}
                </p>
              </motion.div>
            )}
          </div>

          {/* ─── Mobile Bottom Bar ─── */}
          <div
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex mx-4 sm:mx-10 md:hidden overflow-x-auto py-1.5 bg-[#850000] rounded-full fixed bottom-4 items-center"
          >
             <div className="flex flex-row items-center justify-center min-w-full w-fit px-2 gap-1">
                {showSkeleton ? (
                <div className="flex justify-center w-full animate-pulse space-x-2 py-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-14 h-12 bg-white/20 rounded-md"></div>
                    ))}
                </div>
                ) : showError ? (
                <Refetch refetch={refetch} />
                ) : showEmpty ? (
                <p className="text-white/80 text-center text-xs w-full py-2">Layanan tidak tersedia</p>
                ) : (
                services.map((item, i) => (
                    <MobileBarItem
                    key={item.id ?? item.title}
                    item={item}
                    onClick={handleOpenModal}
                    isLast={i === services.length - 1}
                    />
                ))
                )}
            </div>
          </div>

          {/* ─── Desktop Grid ─── */}
          <div className="hidden md:flex flex-wrap justify-center gap-3 w-full max-w-5xl px-4 md:px-0">
            {showSkeleton ? (
              <div className="flex justify-center w-full animate-pulse space-x-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-[150px] h-44 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            ) : showError ? (
              <Refetch refetch={refetch} />
            ) : showEmpty ? (
              <p className="text-gray-500 text-center text-md dark:text-gray-400 w-full">Layanan tidak tersedia</p>
            ) : (
              services.map((item, i) => (
                <DesktopServiceCard key={item.id ?? item.title} item={item} onClick={handleOpenModal} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── Sub-service Modal ─── */}
      <Modal show={!!selectedService} onClose={handleCloseModal} size="3xl" dismissible>
        <ModalHeader>
          <div className="flex items-center gap-3">
            {selectedService?.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src={selectedService.image} alt={selectedService.title} fill sizes="40px" className="object-cover" />
              </div>
            ) : (
              (() => {
                const Icon = Icons[selectedService?.icon as keyof typeof Icons] ?? Icons.FaQuestion;
                return (
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#850000]" />
                  </div>
                );
              })()
            )}
            <div className="min-w-0 flex-1">
              <span className="text-lg font-bold text-[#2B2024] dark:text-white line-clamp-1">
                {selectedService?.title}
              </span>
              {selectedService?.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {selectedService.description}
                </p>
              )}
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnimatePresence>
              {selectedService?.child?.map((child, i) => (
                <ModalChildCard key={child.id ?? child.title} item={child} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
