import { API } from "../config/ApiClient";

export const createUser = async (values) => {
  try {
    const userRegister = await API.post(`/auth/register`, values);
    return userRegister;
  } catch (error) {
    throw error;
  }
};

export const sendVerifyCode = async () => {
  try {
    const sendCode = await API.post(`/auth/send/verifyCode`);
    return sendCode;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (code) => {
  try {
    const verifyEmail = await API.get(`/auth/email/verify/${code}`);
    return verifyEmail;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userLogin = await API.post(`/auth/login`, {
      email,
      password,
    });

    return userLogin;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const forgorPas = await API.post(`/auth/forgot/password`, email);

    return forgorPas;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({ verificationCode, password }) => {
  try {
    const reset = await API.post(`/auth/reset/password`, {
      verificationCode,
      password,
    });

    return reset;
  } catch (error) {
    throw error;
  }
};

export const logOutUser = async () => {
  try {
    const userLogOut = await API.post(`/auth/logout`);
    return userLogOut;
  } catch (error) {
    throw error;
  }
};
