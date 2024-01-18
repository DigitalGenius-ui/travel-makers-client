import axios from "axios";
import { axiosInstance } from "../FetchData/axiosInstance";
import { getStorage, setStorage } from "../Helpers/localStorage";

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getStorage("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const res = await axios.post(
          "/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const accessToken = res?.data?.accessToken;

        if (res?.status === 200) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          setStorage({ item: accessToken, key: "accessToken" });

          // Retry the original request with the new token
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        // Handle error during token refresh
        console.error("Error during token refresh:", refreshError);
        // Optionally, you might want to redirect the user to the login page or do something else here
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
