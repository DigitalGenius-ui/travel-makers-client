import axios from "axios";

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
    const userLogin = await axios.post(`/api/auth/login`, {
      email,
      password,
    });
    return userLogin;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logOutUser = async () => {
  try {
    const userLogin = await axios.post(`/api/auth/logout`);
    return userLogin;
  } catch (error) {
    throw new Error(error.message);
  }
};