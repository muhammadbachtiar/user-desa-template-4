"use client";

import { useQuery } from "@tanstack/react-query";
import useSetting from "./useSettings";
import SettingService from "@/services/controlers/setting/setting.service";

export interface DynamicSectionConfig {
    id: string;
    title: string;
    slug: string;
    order: number;
    enabled: boolean;
}

export interface DynamicSectionsSettingValue {
    sections?: DynamicSectionConfig[];
}

export interface DynamicSectionData {
    config: DynamicSectionConfig;
    content: string;
}

const DEFAULT_SECTIONS: DynamicSectionConfig[] = [
    {
        id: "welcome",
        title: "Kata Sambutan",
        slug: `wellcome-message-${process.env.NEXT_PUBLIC_VILLAGE_ID}`,
        order: 1,
        enabled: true,
    },
    {
        id: "program",
        title: "Program",
        slug: `village-program-${process.env.NEXT_PUBLIC_VILLAGE_ID}`,
        order: 2,
        enabled: true,
    },
];

const EMPTY_CONTENT_MESSAGE = "<p class='text-gray-400 italic p-4'>Konten belum diatur</p>";

async function fetchSectionContent(slug: string): Promise<string> {
    try {
        const response = await SettingService.getStaticPage(slug);
        const content = response?.data?.content;
        return content && content.trim() !== "" ? content : EMPTY_CONTENT_MESSAGE;
    } catch {
        return EMPTY_CONTENT_MESSAGE;
    }
}

async function fetchAllSectionsContent(
    sections: DynamicSectionConfig[]
): Promise<DynamicSectionData[]> {
    const enabledSections = sections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order);

    const results = await Promise.all(
        enabledSections.map(async (config) => ({
            config,
            content: await fetchSectionContent(config.slug),
        }))
    );

    return results;
}

export function useDynamicSections() {
    const villageId = process.env.NEXT_PUBLIC_VILLAGE_ID;

    const { data: settingData, isLoading: isSettingLoading } = useSetting(
        `dynamic-sections-${villageId}`,
        {}
    );

    const sectionsConfig: DynamicSectionConfig[] =
        (settingData?.value as DynamicSectionsSettingValue)?.sections || DEFAULT_SECTIONS;

    const {
        data: sectionsData,
        isLoading: isContentLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["dynamic-sections-content", sectionsConfig],
        queryFn: () => fetchAllSectionsContent(sectionsConfig),
        enabled: !isSettingLoading && sectionsConfig.length > 0,
        staleTime: 1000 * 60 * 30,
    });

    return {
        sections: sectionsData || [],
        isLoading: isSettingLoading || isContentLoading,
        isError,
        refetch,
        hasCustomConfig: !!(settingData?.value as DynamicSectionsSettingValue)?.sections,
    };
}

export default useDynamicSections;
