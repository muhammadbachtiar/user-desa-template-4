import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_PUBLIC_VERSION = "/api/v1/public";
const API_PRIVATE_VERSION = "/api/v1";

const axiosConfig = axios.create({
    baseURL: API_URL + API_PUBLIC_VERSION,
    headers: {
      Accept: "application/json",
     "x-village-id": process.env.NEXT_PUBLIC_VILLAGE_ID,
    },
    timeout: 15000
  });
  
axiosConfig.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        console.error("Request error:", error);
        return Promise.reject(error); 
    }
);

axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            return { data: null }; 
        }
        return Promise.reject(error);
    }
);

export const axiosConfigPrivate = axios.create({
  baseURL: API_URL + API_PRIVATE_VERSION,
  headers: {
    Accept: "application/json",
     "x-village-id": process.env.NEXT_PUBLIC_VILLAGE_ID,
  },
});

axiosConfigPrivate.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfigPrivate.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            return { data: null }; 
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;
