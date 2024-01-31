import axios from "axios";
import { axiosInstance } from "../axiosInstance";

axios.defaults.withCredentials = true;

export const createUser = async ({ email, password }) => {
  try {
    const userRegister = await axios.post(`/api/auth/register`, {
      email,
      password,
    });
    return userRegister;
  } catch (error) {
    if (error.response.data.status === "ERROR") {
      return error.response;
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userLogin = await axios.post(`/api/auth/login`, {
      email,
      password,
    });

    return userLogin;
  } catch (error) {
    if (error.response.data.status === "ERROR") {
      return error.response;
    }
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
