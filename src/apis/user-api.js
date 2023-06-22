import { axiosInstance } from "../utils/axiosInstance";

export const usersLogin = (body) => axiosInstance.post("/users/login", body);

export const usersRegistration = (body) =>
  axiosInstance.post("/users/register", body);

export const usersLoginGoogle = (body) =>
  axiosInstance.post("/users/authenticate", body);

export const usersOrder = (id) => axiosInstance.get(`/users/my-order/${id}`);
