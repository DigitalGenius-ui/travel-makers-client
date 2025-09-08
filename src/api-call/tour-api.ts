import { API, publicAPI } from "../config/ApiClient";
import type { tourReview, tourType } from "../types/tours-type";

// get all tours data
export type tourWithReviwes = tourType & {
  reviews: tourReview[];
};
export const getTours = async () => {
  const tours = await publicAPI.get<tourWithReviwes[]>(`/tours`);
  return tours.data;
};

// upload tours reviews images
export const uploadImages = async (images: string[]) => {
  const res = await API.post("/tours/uploadImages", images);
  return res.data;
};

// create tour data tour data
export type createTourProps = {
  rating: string;
  text: string;
  reviewImages: string[];
  toursId: string | undefined;
  userId: string | undefined;
};
export const createTourReview = async (data: createTourProps) => {
  const tour = await API.post(`/tours/createReview`, data);
  return tour.data;
};

// remove tour data tour data
export const removeTourReview = async (id: string) => {
  const tour = await API.post(`/tours/removeReview/${id}`);
  return tour.data;
};

//create payment data
export type checkoutType = {
  name: string;
  image: string | undefined;
  description: string | undefined;
  price: number;
  quantity: number;
  id: string | undefined;
};
export const createCheckout = async (data: checkoutType[]) => {
  const checkOut = await API.post(`/tours/create-checkout-session`, data);
  return checkOut.data;
};

// create tickets
export type createTicketType = {
  totalPrice: number;
  phone: string;
  userId: string | undefined;
  tourImage: string | undefined;
  title: string | undefined;
  date: string;
  bookTime: string;
  child: number;
  adult: number;
  firstName: string;
  lastName: string;
  email: string;
};
export const createTicket = async (data: createTicketType) => {
  const ticket = await API.post("/tours/ticketSave", data);
  return ticket.data;
};
