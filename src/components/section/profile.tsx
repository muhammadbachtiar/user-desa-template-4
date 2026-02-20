'use client'

import { useState, useEffect, useRef } from 'react';
import RichTextContent from '../shared/RichTextContent';
import Refetch from '../shared/refetch';
import { useDynamicSections } from '@/hooks/settings/useDynamicSections';

export default function Profile() {
  const { sections, isLoading, isError, refetch } = useDynamicSections();
  const [activeTab, setActiveTab] = useState('');
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // Set first tab as active when sections load
  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].config.id);
    }
  }, [sections, activeTab]);

  // Scroll active tab into view on mobile
  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const activeButton = document.getElementById(`tab-btn-${id}`);
    if (activeButton && tabContainerRef.current) {
      activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative w-full flex justify-center items-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="animate-pulse">
            {/* Tab skeleton */}
            <div className="flex gap-6 ps-2 mb-6">
              <div className="h-10 w-28 bg-gray-200 rounded"></div>
              <div className="h-10 w-24 bg-gray-200 rounded"></div>
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
            </div>
            {/* Content skeleton */}
            <div className="rounded-2xl border-2 border-[#EDEDED] min-h-[400px] p-6 md:p-12">
              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-32 w-full bg-gray-100 rounded-lg mt-6"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="relative w-full flex justify-center items-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex min-h-[400px] justify-center items-center">
            <Refetch refetch={refetch} />
          </div>
        </div>
      </section>
    );
  }

  // No sections
  if (sections.length === 0) return null;

  const activeSection = sections.find((s) => s.config.id === activeTab) || sections[0];

  return (
    <section className="relative w-full flex justify-center items-center">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col">

        {/* ─── Tab Bar ─── */}
        <div className="relative mb-6">
          {/* Scrollable tab container */}
          <div
            ref={tabContainerRef}
            className="flex gap-6 ps-2 overflow-x-auto"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sections.map((section) => {
              const isActive = activeTab === section.config.id;
              return (
                <button
                  key={section.config.id}
                  id={`tab-btn-${section.config.id}`}
                  onClick={() => handleTabClick(section.config.id)}
                  className={`relative px-1 py-3 flex-shrink-0 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none ${
                    isActive
                      ? 'text-[#850000] dark:text-red-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {section.config.title}
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
                      isActive ? 'bg-[#850000] dark:bg-red-400' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* ─── Content Canvas ─── */}
        <div
          className="rounded-2xl border-2 border-[#EDEDED] dark:border-gray-700 min-h-[400px] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="px-4 py-4 md:px-16 md:py-8">
            <RichTextContent
              content={activeSection?.content || ''}
              className="max-w-none"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
