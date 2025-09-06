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
export type createTourProps = {
  rating: string;
  text: string;
  reviewImages: string[];
  toursId: string | undefined;
  userId: string;
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
