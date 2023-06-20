import { axiosInstance } from "../utils/axiosInstance";

export const ordersCreate = (body) =>
  axiosInstance.post("/orders/create", body);

export const ordersList = () => axiosInstance.get("/orders/list");

export const ordersRate = (body) =>
  axiosInstance.post("/orders/rate-order", body);

export const ordersUpdate = (body) =>
  axiosInstance.post("/orders/update", body);
