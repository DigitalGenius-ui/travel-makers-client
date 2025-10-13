import { API, publicAPI } from "../config/ApiClient";
import type {
  tourReview,
  tourRewviewsCount,
  tourType,
} from "../types/tours-type";

// get all tours data

export type tourWithReviwes = {
  allTours: tourRewviewsCount[];
  totalPages: number;
};
export const getTours = async (limit?: number, page?: number, cat?: string) => {
  const params = new URLSearchParams();

  if (limit) params.append("limit", String(limit));
  if (page) params.append("page", String(page));
  if (cat) params.append("cat", cat);

  const query = params.toString() ? `?${params.toString()}` : "";

  const tours = await publicAPI.get<tourWithReviwes>(`/tours${query}`);
  return tours.data;
};

// get all tours data
export type singleTourWithReviwes = tourType & {
  reviews: tourReview[];
};
export const getSingleTours = async (tourId: string | undefined) => {
  const singleTour = await publicAPI.get<singleTourWithReviwes>(
    `/tours/${tourId}`
  );
  return singleTour.data;
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

type createCheckoutApiType = {
  url: string;
};
export const createCheckout = async (data: checkoutType[]) => {
  const checkOut = await API.post<createCheckoutApiType>(
    `/tours/create-checkout-session`,
    data
  );
  return checkOut.data;
};

// create tickets
export type createTicketType = {
  totalPrice: string;
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
