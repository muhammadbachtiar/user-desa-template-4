"use client";

import { useQuery } from "@tanstack/react-query";
import SettingService from "@/services/controlers/setting/setting.service";

// Hardcoded village ID for chatbot settings
const CHATBOT_VILLAGE_ID = 21;

export interface ChatbotSettingValue {
    id: string;
    url: string;
}

export interface ChatbotSettingData {
    id: number;
    name: string;
    value: ChatbotSettingValue;
    created_at: string;
    updated_at: string;
    village_id: number;
}

function useChatbotSettings() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["chatbot-token", CHATBOT_VILLAGE_ID],
        queryFn: async () => {
            return await SettingService.getSetting(`chatbot-token`, {}, { "x-village-id": CHATBOT_VILLAGE_ID });
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
        retry: 2,
    });

    // Fallback to env variables if API fails or returns no data
    const settingData = data?.data as ChatbotSettingData | undefined;

    const chatbotId = settingData?.value?.id ?? process.env.NEXT_PUBLIC_CHATBOT_ID ?? '';
    const chatbotUrl = settingData?.value?.url ?? process.env.NEXT_PUBLIC_CHATBOT_BASE_URL ?? '';

    return {
        chatbotId,
        chatbotUrl,
        isLoading,
        isError,
        refetch,
        hasSettingsFromAPI: !!settingData?.value,
    };
}

export default useChatbotSettings;
