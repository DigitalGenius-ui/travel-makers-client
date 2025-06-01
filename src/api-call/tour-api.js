import { API } from "../config/ApiClient";

// get all tours data
export const getTours = async () => {
  try {
    const tours = await API.get(`/tours`);
    return tours;
  } catch (error) {
    throw new Error(error.message);
  }
};

// upload tours reviews images
export const uploadImages = async (images) => {
  try {
    const res = await API.post("/tours/uploadImages", images);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create tour data tour data
export const createTourReview = async (data) => {
  try {
    const tour = await API.post(`/tours/createReview`, data);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};

// remove tour data tour data
export const removeTourReview = async (id) => {
  try {
    const tour = await API.post(`/tours/removeReview/${id}`);
    return tour;
  } catch (error) {
    throw new Error(error.message);
  }
};

//create payment data
export const createCheckout = async (data) => {
  try {
    const checkOut = await API.post(`/tours/create-checkout-session`, data);
    return checkOut;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create tickets
export const createTicket = async (data) => {
  try {
    const ticket = await API.post("/tours/ticketSave", data);
    return ticket.data;
  } catch (error) {
    throw new Error(error);
  }
};
