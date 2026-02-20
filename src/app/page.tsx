"use client"

import HeroSection from "@/components/section/hero";
import AppSection from "@/components/section/app";
import ProfileSection from "@/components/section/profile";
import ArticleSection from "@/components/section/article";
import Tour from "@/components/section/tour";
import Infografis from "@/components/section/infografis";
import DynamicInstagramFeed from "@/components/instagram/DynamicInstagramFeed";
import useFeatureFlags, { type SectionKey } from "@/hooks/settings/useFeatureFlags";

const SECTION_COMPONENTS: Record<SectionKey, React.ComponentType> = {
  dynamic_section: ProfileSection,
  service: AppSection,
  news: ArticleSection,
  instagram: DynamicInstagramFeed,
  infografis: Infografis,
  tour: Tour,
};

export default function Home() {
  const { sectionsOrder } = useFeatureFlags();

  const enabledSections = sectionsOrder.filter((s) => s.enabled);

  return (
    <>
      <HeroSection />
      {enabledSections.map((section) => {
        const Component = SECTION_COMPONENTS[section.key];
        return Component ? <Component key={section.key} /> : null;
      })}
    </>
  );
}
