import axios from "axios";
import { BACKEND_URL } from "../constants/env";

const options = {
  baseURL: BACKEND_URL,
  withCredentials: true,
};

export const API = axios.create(options);

export const publicAPI = axios.create(options);
publicAPI.interceptors.response.use((response) => {
  return response.data;
});

const tokenRefreshClient = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => {
  return response.data;
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    let { config, response } = error;
    let { status, data } = response || {};
    if (
      data?.errorCode === "TOKEN_NOT_FOUND" ||
      data?.errorCode === "INVALID_TOKEN"
    ) {
      // refresh the access token, then retry the original request
      await tokenRefreshClient.get("/auth/refresh");
      await tokenRefreshClient(config);
    }
    return Promise.reject({ status, ...data });
  }
);
