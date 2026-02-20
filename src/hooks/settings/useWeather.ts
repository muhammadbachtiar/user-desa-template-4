"use client";

import { useQuery } from "@tanstack/react-query";
import { BMKGWeatherResponse } from "@/types/weather";

async function fetchWeather(adm4: string): Promise<BMKGWeatherResponse> {
    const response = await fetch(
        `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    return response.json();
}

export function useWeather(adm4: string | null) {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["weather", adm4],
        queryFn: () => fetchWeather(adm4!),
        enabled: !!adm4,
        staleTime: 1000 * 60 * 30, // 30 minutes
        refetchInterval: 1000 * 60 * 30, // refetch every 30 minutes
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
}

export default useWeather;
