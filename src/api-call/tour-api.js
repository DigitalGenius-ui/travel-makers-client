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

// upload tours reviews images
export const uploadImages = async (images) => {
  try {
    const res = await axios.post("/api/tours/uploadImages", images);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create tour data tour data
export const createTourReview = async (data) => {
  try {
    const tour = await axios.post(`/api/tours/createReview`, data);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};

// remove tour data tour data
export const removeTourReview = async (id) => {
  try {
    const tour = await axios.post(`/api/tours/removeReview/${id}`);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};

//create payment data
export const createCheckout = async (data) => {
  try {
    const checkOut = await axios.post(
      `/api/tours/create-checkout-session`,
      data
    );
    return checkOut;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create tickets
export const createTicket = async (data) => {
  try {
    const ticket = await axios.post("/api/tours/ticketSave", data);
    return ticket.data;
  } catch (error) {
    throw new Error(error);
  }
};
