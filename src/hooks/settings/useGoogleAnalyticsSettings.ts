"use client";

import { useQuery } from "@tanstack/react-query";
import SettingService from "@/services/controlers/setting/setting.service";

interface GoogleAnalyticsSettingValue {
    id: string;
}

interface GoogleAnalyticsSettingData {
    id: number;
    name: string;
    value: GoogleAnalyticsSettingValue;
    created_at: string;
    updated_at: string;
    village_id: number;
}

function useGoogleAnalyticsSettings() {
    const villageId = process.env.NEXT_PUBLIC_VILLAGE_ID;

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["google-analytics-id", villageId],
        queryFn: async () => {
            return await SettingService.getSetting(`google-analytics-id-${villageId}`);
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
        retry: 2,
    });

    const settingData = data?.data as GoogleAnalyticsSettingData | undefined;

    // Use value.id if available, otherwise fallback to env
    const gaId = settingData?.value?.id ?? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';

    return {
        gaId,
        isLoading,
        isError,
    };
}

export default useGoogleAnalyticsSettings;
