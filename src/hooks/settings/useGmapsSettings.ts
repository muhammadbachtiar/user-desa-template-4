"use client";

import { useQuery } from "@tanstack/react-query";
import SettingService from "@/services/controlers/setting/setting.service";

const GMAPS_VILLAGE_ID = 21;

export interface GmapsSettingValue {
    token: string;
}

export interface GmapsSettingData {
    id: number;
    name: string;
    value: GmapsSettingValue;
    created_at: string;
    updated_at: string;
    village_id: number;
}

function useGmapsSettings() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["gmaps-token", GMAPS_VILLAGE_ID],
        queryFn: async () => {
            return await SettingService.getSetting(`gmaps-token`, {}, { "x-village-id": GMAPS_VILLAGE_ID });
        },
        staleTime: 1000 * 60 * 30,
        retry: 2,
    });

    const settingData = data?.data as GmapsSettingData | undefined;

    const gmapsApiKey = settingData?.value?.token ?? process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? '';

    return {
        gmapsApiKey,
        isLoading,
        isError,
        refetch,
        hasSettingsFromAPI: !!settingData?.value,
    };
}

export default useGmapsSettings;
