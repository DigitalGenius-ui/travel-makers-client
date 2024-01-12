import axios from "axios";

export const getTours = async () => {
  try {
    const tours = await axios.get("http://localhost:5000/api/tours");
    return tours;
  } catch (error) {
    throw new Error(error.message);
  }
};
