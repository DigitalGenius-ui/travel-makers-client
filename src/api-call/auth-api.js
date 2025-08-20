import { API } from "../config/ApiClient";

export const createUser = async (values) => {
  const userRegister = await API.post(`/auth/register`, values);
  return userRegister;
};

export const sendVerifyCode = async () => {
  const sendCode = await API.post(`/auth/send/verifyCode`);
  return sendCode;
};

export const verifyEmail = async (code) => {
  const verifyEmail = await API.get(`/auth/email/verify/${code}`);
  return verifyEmail;
};

export const loginUser = async ({ email, password }) => {
  const userLogin = await API.post(`/auth/login`, {
    email,
    password,
  });
  return userLogin;
};

export const forgotPassword = async (email) => {
  const forgorPas = await API.post(`/auth/forgot/password`, email);
  return forgorPas;
};

export const resetPassword = async ({ verificationCode, password }) => {
  const reset = await API.post(`/auth/reset/password`, {
    verificationCode,
    password,
  });
  return reset;
};

export const logOutUser = async () => {
  const userLogOut = await API.post(`/auth/logout`);
  return userLogOut;
};
