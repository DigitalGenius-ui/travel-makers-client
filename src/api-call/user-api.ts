import { API, publicAPI } from "../config/ApiClient";
import type { ticketStatusType, ticketsType } from "../types/tours-type";
import type {
  userCommentType,
  userMomentType,
  userWithProfileType,
} from "../types/user-type";

// get current user details
export interface currentUserApi extends userWithProfileType {
  moments: userMomentType[];
}
export const getCurrentUser = async () => {
  const res = await API.get<currentUserApi>(`/user`);
  return res.data;
};

// get user by id details
export const getSingleUser = async (id: string | undefined) => {
  const res = await publicAPI.get<currentUserApi>(`/user/getSingleUser/${id}`);
  return res.data;
};

// get all users
export type getAllUserProps = {
  page: number;
  limit: number;
  type: string;
  search?: string;
};

export type allUsersType = {
  users: userWithProfileType[];
  totalPages: number;
};
export const getAllUsers = async ({
  page,
  limit,
  type,
  search,
}: getAllUserProps) => {
  const res = await API.get<allUsersType>(
    `/user/getAllUsers?page=${page}&limit=${limit}&type=${type}&search=${search}`
  );
  return res.data;
};

// update profile data
type detailsUpdateType = {
  userId: string;
  role: "USER" | "ADMIN" | "EDITOR";
  verified: boolean;
};
export const userDetailsUpdate = async (data: detailsUpdateType) => {
  const res = await API.post(`/user/updateUserDetails`, data);
  return res.data;
};

// remove user
export const removeUser = async (id: string) => {
  const res = await API.delete(`/user/removeUser/${id}`);
  return res.data;
};

// update profile data
type profileType = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  userImg?: string;
  bio?: string;
};
export const profileDetailsUpdate = async (data: profileType) => {
  const res = await API.post(`/user/profile`, data);
  return res.data;
};

// update profile image
export const updateProfileImage = async (userImg: string) => {
  const res = await API.post(`/user/uploadImage`, { userImg });
  return res.data;
};

// create moment post
export type createMomentType = {
  title: string;
  desc: string;
  location: string;
  postImages: string[];
};
export const createMoment = async (data: createMomentType) => {
  const res = await API.post(`/user/createPost`, data);
  return res.data;
};

// create moment post
export const removeMoment = async (id: string) => {
  const res = await API.delete(`/user/removePost/${id}`);
  return res.data;
};

// get single moment post
export const getSingleMoment = async (id: string | undefined) => {
  const res = await API.get(`/user/singleMoment/${id}`);
  return res.data;
};

// create moment post comment
type commentType = {
  comment: string;
  userId: string;
  momentId: string | undefined;
};
export const momentPostCommentCreate = async (data: commentType) => {
  const res = await API.post(`/user/createComment`, data);
  return res.data;
};

// create moment post comment
export const momentPostCommentRemove = async (id: string) => {
  const res = await API.delete(`/user/removeComment/${id}`);
  return res.data;
};

// change profile password
type passType = {
  currentPassword: string;
  newPassword: string;
  userId: string;
};
export const changeProfilePassword = async (data: passType) => {
  return await API.put(`/user/changePassword/${data.userId}`, data);
};

// get booking
type getBookingType = {
  bookings: ticketsType[];
  totalPages: number;
};
export const getBooking = async (page: number, limit: number) => {
  const res = await API.get<getBookingType>(
    `/user/getUserBooking?page=${page}&limit=${limit}`
  );
  return res.data;
};

// get Moments
type momentApiType = {
  moments: userMomentType & {
    comments: userCommentType[];
  };
  totalPages: number;
};
export const getMoments = async (
  page: number,
  id: string | undefined,
  limit: number
) => {
  const res = await API.get<momentApiType>(
    `/user/getUserMoments/${id}?page=${page}&limit=${limit}`
  );
  return res.data;
};

// get getUserReviews
export const getUserReviews = async (page: number, limit: number) => {
  const res = await API.get(`/user/getUserReviews?page=${page}&limit=${limit}`);
  return res.data;
};

// get all tickets
type getTickets = {
  allTickets: ticketsType[];
  totalPages: number;
  totalTickets: number;
};
export const getUserTickets = async (
  page: number,
  limit: number,
  search: string
) => {
  const res = await API.get<getTickets>(
    `/user/getAllTickets?page=${page}&limit=${limit}&search=${search}`
  );
  return res.data;
};

// update ticket
type userTicketType = {
  status: ticketStatusType;
  travelDate: string;
  id: string;
};
export const updateUserTickets = async (data: userTicketType) => {
  const res = await API.post(`/user/updateUserTicket`, data);
  return res.data;
};

// remove ticket
export const removeUserTicket = async (id: string) => {
  const res = await API.delete(`/user/removeUserTicket/${id}`);
  return res.data;
};
