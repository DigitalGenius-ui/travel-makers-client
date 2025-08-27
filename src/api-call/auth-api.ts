import { API } from "../config/ApiClient";

export type registerType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export const createUser = async (values: registerType) => {
  const userRegister = await API.post(`/auth/register`, values);
  return userRegister;
};

export const sendVerifyCode = async () => {
  const sendCode = await API.post(`/auth/send/verifyCode`);
  return sendCode;
};

export const verifyEmail = async (code: string | undefined) => {
  const verifyEmail = await API.get(`/auth/email/verify/${code}`);
  return verifyEmail;
};

export type loginType = { email: string; password: string };

export const loginUser = async ({ email, password }: loginType) => {
  const userLogin = await API.post(`/auth/login`, {
    email,
    password,
  });
  return userLogin;
};

export const forgotPassword = async (email: { email: string }) => {
  const forgorPas = await API.post(`/auth/forgot/password`, email);
  return forgorPas;
};

export const resetPassword = async ({
  code,
  password,
}: {
  code: string | null;
  password: string;
}) => {
  const reset = await API.post(`/auth/reset/password`, {
    verificationCode: code,
    password,
  });
  return reset;
};

export const logOutUser = async () => {
  const userLogOut = await API.post(`/auth/logout`);
  return userLogOut;
};
