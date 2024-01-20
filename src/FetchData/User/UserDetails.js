import axios from "axios";

export const getUserDetails = async (id) => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
