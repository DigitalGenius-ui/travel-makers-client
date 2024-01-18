import axios from "axios";
import { axiosInstance } from "../axiosInstance";

export const createUser = async ({ email, password }) => {
  try {
    const userRegister = await axios.post(`/api/auth/register`, {
      email,
      password,
    });
    return userRegister;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userLogin = await axiosInstance.post(
      `/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    const accessToken = userLogin?.data?.accessToken;

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return userLogin;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logOutUser = async () => {
  try {
    const userLogOut = axiosInstance.post(`/api/auth/logout`);
    return userLogOut;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const applyRefreshToken = async () => {
  try {
    const getRefreshToken = axiosInstance.post(
      "/api/auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );
    return getRefreshToken;
  } catch (error) {
    throw new Error(error.message);
  }
};
