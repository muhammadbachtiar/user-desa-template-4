import axiosConfig, { axiosConfigPrivate } from "@/configs/axios";

const SettingService = {
    getSetting: async (slug : string, params ={}) => {
        const response = await axiosConfig.get(`/settings/${slug}`, {
            params,
          });
        return response.data;
    },

    getStaticPage: async (slug : string, params ={}) => {
        const response = await axiosConfigPrivate.get(`/statis-page/${slug}`, {
            params,
          });
        return response.data;
    }
}

export default SettingService;