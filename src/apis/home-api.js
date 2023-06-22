import { axiosInstance } from "../utils/axiosInstance";

export const homeArticles = () => axiosInstance.get("/home/articles");

export const homeStatus = () => axiosInstance.get("/home/status");
