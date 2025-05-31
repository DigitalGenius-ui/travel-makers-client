import axios from "axios";
import { BACKEND_URL } from "../constants/env";
import { queryClient } from "./queryClient";

const options = {
  baseURL: BACKEND_URL,
  withCredentials: true,
};

export const API = axios.create(options);

const tokenRefreshClient = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => {
  return response.data;
});

API.interceptors.response.use(
  (response) => {
    console.log(response.data);
  },
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    if (status === 401 && data.errorCode === "TOKEN_NOT_FOUND") {
      try {
        // refresh the access token, then retry the original request
        const token = await tokenRefreshClient.get("/auth/refresh");
        console.log(token);
        await tokenRefreshClient(config);
      } catch (error) {
        console.log(error);
        queryClient.clear();
        // navigate("/sign-in", {
        //   state: {
        //     redirect: window.location.pathname,
        //   },
        // });
        return Promise.reject({ status, ...data });
      }
    }
  }
);
