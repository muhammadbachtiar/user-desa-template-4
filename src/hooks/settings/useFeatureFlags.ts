"use client";

import useSetting from "./useSettings";

export type SectionKey = "dynamic_section" | "service" | "news" | "instagram" | "infografis" | "tour";

export interface SectionConfig {
    key: SectionKey;
    enabled: boolean;
    order: number;
}

export interface FeaturesSettingValue {
    pressRelease?: boolean;
    sectionsOrder?: SectionConfig[];
}

const DEFAULT_SECTIONS_ORDER: SectionConfig[] = [
    { key: "dynamic_section", enabled: true, order: 1 },
    { key: "service", enabled: true, order: 2 },
    { key: "news", enabled: true, order: 3 },
    { key: "instagram", enabled: true, order: 4 },
    { key: "infografis", enabled: true, order: 5 },
    { key: "tour", enabled: true, order: 6 },
];

const NON_OPTIONAL_SECTIONS: SectionKey[] = ["news", "infografis"];

export function useFeatureFlags() {
    const villageId = process.env.NEXT_PUBLIC_VILLAGE_ID;

    const { data: settingData, isLoading, isError } = useSetting(`features-${villageId}`, {});

    const settingValue: FeaturesSettingValue = settingData?.value || {};
    const apiSectionsOrder: SectionConfig[] = settingValue.sectionsOrder || [];

    const getSortedSections = (): SectionConfig[] => {
        const baseSections = apiSectionsOrder.length > 0 ? apiSectionsOrder : DEFAULT_SECTIONS_ORDER;

        return baseSections
            .map((section) => ({
                ...section,
                enabled: NON_OPTIONAL_SECTIONS.includes(section.key) ? true : section.enabled,
            }))
            .sort((a, b) => a.order - b.order);
    };

    const sectionsOrder = getSortedSections();

    const isSectionEnabled = (key: SectionKey): boolean => {
        if (NON_OPTIONAL_SECTIONS.includes(key)) return true;
        const section = sectionsOrder.find((s) => s.key === key);
        return section?.enabled ?? true;
    };

    return {
        pressRelease: settingValue.pressRelease ?? true,
        sectionsOrder,
        isLoading,
        isError,
        isSectionEnabled,
    };
}

export default useFeatureFlags;
