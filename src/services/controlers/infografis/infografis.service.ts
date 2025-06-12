import axiosConfig from "@/configs/axios";

const InfografisService = {
    getAll: async (params = {}) => {
        const response = await axiosConfig.get("/infografis", {
            params,
          });
          return response.data;
    },
    
    getOne: async (slug : string, params ={}) => {
        const response = await axiosConfig.get(`/infografis/${slug}`, {
            params,
          });
          return response.data;
    }
}

export default InfografisService;