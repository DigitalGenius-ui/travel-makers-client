import axios from "axios";

export const getTours = async () => {
  try {
    const tours = await axios.get(`/api/tours`);
    return tours;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSingleTour = async (id) => {
  try {
    const tour = await axios.get(`/api/tours/${id}`);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};
