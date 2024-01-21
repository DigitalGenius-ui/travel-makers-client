import axios from "axios";

// get all tours data
export const getTours = async () => {
  try {
    const tours = await axios.get(`/api/tours`);
    return tours;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get single tour data
export const getSingleTour = async (id) => {
  try {
    const tour = await axios.get(`/api/tours/${id}`);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get single tour data
export const createTourReview = async (data) => {
  try {
    const tour = await axios.post(`/api/tours/createReview`, data);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};
