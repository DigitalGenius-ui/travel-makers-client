import axios from "axios";

export const profileDetails = async (userId) => {
  try {
    const details = await axios.get(`/api/profile/${userId}`);
    return details;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const profileDetailsUpdate = async (data) => {
  try {
    const details = await axios.post(`/api/profile`, data);
    return details;
  } catch (error) {
    throw new Error(error.message);
  }
};
