import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://techku.ephorize.org",
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
