import { API, publicAPI } from "../config/ApiClient";

// get all tours data
export const getTours = async () => {
  const tours = await publicAPI.get(`/tours`);
  return tours;
};

// upload tours reviews images
export const uploadImages = async (images) => {
  const res = await API.post("/tours/uploadImages", images);
  return res;
};

// create tour data tour data
export const createTourReview = async (data) => {
  const tour = await API.post(`/tours/createReview`, data);
  return tour;
};

// remove tour data tour data
export const removeTourReview = async (id) => {
  const tour = await API.post(`/tours/removeReview/${id}`);
  return tour;
};

//create payment data
export const createCheckout = async (data) => {
  const checkOut = await API.post(`/tours/create-checkout-session`, data);
  return checkOut;
};

// create tickets
export const createTicket = async (data) => {
  const ticket = await API.post("/tours/ticketSave", data);
  return ticket;
};
