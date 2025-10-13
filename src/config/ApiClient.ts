import axios from "axios";
import { BACKEND_URL } from "../constants/env";
import { UNATHURIZED } from "../constants/react-query";

const options = {
  baseURL: BACKEND_URL,
  withCredentials: true,
};

export const API = axios.create(options);

export const publicAPI = axios.create(options);
publicAPI.interceptors.response.use((response) => {
  return response;
});

const tokenRefreshClient = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => {
  return response.data;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNATHURIZED) {
      // refresh the access token, then retry the original request
      await tokenRefreshClient.get("/auth/refresh");
      await tokenRefreshClient(config);
    }
    return Promise.reject({ status, ...data });
  }
);
