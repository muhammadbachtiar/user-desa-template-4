"use client";

import { useQuery } from "@tanstack/react-query";
import SettingService from "@/services/controlers/setting/setting.service";
import { Kecamatan } from "@/types/weather";
import kecamatanData from "@/kecamatan.json";

// Hardcoded village ID for weather settings
const WEATHER_VILLAGE_ID = 21;

export interface WeatherSettingData {
    id: number;
    name: string;
    value: Kecamatan[];
    created_at: string;
    updated_at: string;
    village_id: number;
}

function useWeatherSettings() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["weather-data", WEATHER_VILLAGE_ID],
        queryFn: async () => {
            return await SettingService.getSetting(`weather-data`, {}, { "x-village-id": WEATHER_VILLAGE_ID });
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
        retry: 2,
    });

    const settingData = data?.data as WeatherSettingData | undefined;

    // Use data from API, fallback to default if not available
    const kecamatanList: Kecamatan[] = settingData?.value ?? kecamatanData;

    return {
        kecamatanList,
        isLoading,
        isError,
        refetch,
        hasSettingsFromAPI: !!settingData?.value,
    };
}

export default useWeatherSettings;
