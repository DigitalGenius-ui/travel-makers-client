import { API, publicAPI } from "../config/ApiClient";

// get all tours data
export type tourType = {
  id: string;
  title: string;
  open_time: Date;
  close_time: string;
  address: string;
  phone_number: string;
  number_of_tickets: number;
  description: string;
  userId: string;
  country: string;
  city: string;
  price: number;
  category: string;
  iframe_map: string;
  tourImages: string[];
  tourDuration: string;
  createAt: Date;
  updatedAt: Date;
};

export const getTours = async () => {
  const tours = await publicAPI.get<tourType[]>(`/tours`);
  return tours.data;
};

// upload tours reviews images
export const uploadImages = async (images: string[]) => {
  const res = await API.post("/tours/uploadImages", images);
  return res.data;
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
export const createCheckout = async (data: any) => {
  const checkOut = await API.post(`/tours/create-checkout-session`, data);
  return checkOut.data;
};

// create tickets
export const createTicket = async (data) => {
  const ticket = await API.post("/tours/ticketSave", data);
  return ticket.data;
};
