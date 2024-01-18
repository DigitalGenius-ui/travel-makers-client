import axios from "axios";

export const profileDetails = async (id) => {
  try {
    const details = await axios.get(`/api/profile/${id}`);
    return details;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const profileDetailsUpdate = async (data) => {
  try {
    const details = await axios.get(`/api/profile/${id}`, data);
    return details;
  } catch (error) {
    throw new Error(error.message);
  }
};
