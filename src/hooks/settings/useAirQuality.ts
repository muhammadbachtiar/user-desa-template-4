"use client";

import { useQuery } from "@tanstack/react-query";
import { AirQualityResponse } from "@/types/weather";

async function fetchAirQuality(lat: number, lon: number): Promise<AirQualityResponse> {
    const response = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch air quality data");
    }

    return response.json();
}

export function useAirQuality(lat: number | null, lon: number | null) {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["airQuality", lat, lon],
        queryFn: () => fetchAirQuality(lat!, lon!),
        enabled: lat !== null && lon !== null,
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

// Helper function to get AQI level info
export function getAQILevel(aqi: number) {
    if (aqi <= 50) {
        return {
            label: "Baik",
            labelEn: "Good",
            color: "text-green-600",
            bgColor: "bg-green-100",
            borderColor: "border-green-200",
        };
    } else if (aqi <= 100) {
        return {
            label: "Sedang",
            labelEn: "Moderate",
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
            borderColor: "border-yellow-200",
        };
    } else if (aqi <= 150) {
        return {
            label: "Tidak Sehat (Sensitif)",
            labelEn: "Unhealthy for Sensitive",
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            borderColor: "border-orange-200",
        };
    } else if (aqi <= 200) {
        return {
            label: "Tidak Sehat",
            labelEn: "Unhealthy",
            color: "text-red-600",
            bgColor: "bg-red-100",
            borderColor: "border-red-200",
        };
    } else if (aqi <= 300) {
        return {
            label: "Sangat Tidak Sehat",
            labelEn: "Very Unhealthy",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            borderColor: "border-purple-200",
        };
    } else {
        return {
            label: "Berbahaya",
            labelEn: "Hazardous",
            color: "text-rose-700",
            bgColor: "bg-rose-100",
            borderColor: "border-rose-200",
        };
    }
}

export default useAirQuality;
