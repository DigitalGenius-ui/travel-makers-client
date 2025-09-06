import { API, publicAPI } from "../config/ApiClient";

// get current user details
export const getCurrentUser = async () => {
  return await API.get(`/user`);
};

// get user by id details
export type userType = {}; // todo
export const getSingleUser = async (id: string | undefined) => {
  const res = await publicAPI.get(`/user/getSingleUser/${id}`);
  return res.data;
};

// get all users
export type getAllUserProps = {
  page: number;
  limit: number;
  type: string;
  search?: string;
};
export const getAllUsers = async ({
  page,
  limit,
  type,
  search,
}: getAllUserProps) => {
  const res = await API.get(
    `/user/getAllUsers?page=${page}&limit=${limit}&type=${type}&search=${search}`
  );
  return res.data;
};

// update profile data
export const userDetailsUpdate = async (data) => {
  return await API.post(`/user/updateUserDetails`, data);
};

// remove user
export const removeUser = async (id) => {
  return await API.delete(`/user/removeUser/${id}`);
};

// update profile data
export const profileDetailsUpdate = async (data) => {
  return await API.post(`/user/profile`, data);
};

// update profile image
export const updateProfileImage = async (userImg) => {
  return await API.post(`/user/uploadImage`, { userImg });
};

// create moment post
export const createMoment = async (data) => {
  return await API.post(`/user/createPost`, data);
};

// create moment post
export const removeMoment = async (id: string) => {
  return await API.delete(`/user/removePost/${id}`);
};

// get single moment post
export const getSingleMoment = async (id: string | undefined) => {
  const res = await API.get(`/user/singleMoment/${id}`);
  return res.data;
};

// create moment post comment
export const momentPostCommentCreate = async (data) => {
  return await API.post(`/user/createComment`, data);
};

// create moment post comment
export const momentPostCommentRemove = async (id) => {
  return await API.delete(`/user/removeComment/${id}`);
};

// change profile password
export const changeProfilePassword = async (data) => {
  return await API.put(`/user/changePassword/${data.userId}`, data);
};

// get booking
// export type bookingType = {
//   bookings: {
//     id: string;
//     title: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     travelDate: string;
//     tickets: {
//       adult: number;
//       child: number;
//     };
//     totalPrice: string;
//     tourImage: string;
//     status: "pending" | "canceled" | "verified";
//     verifyNumber: string;
//     userId: string;
//     createAt: Date;
//     updatedAt: Date;
//   }[];
//   totalPages: number;
// };
export const getBooking = async (page: number, limit: number) => {
  const res = await API.get<any>(
    `/user/getUserBooking?page=${page}&limit=${limit}`
  );
  return res.data;
};

// get Moments
export const getMoments = async (
  page: number,
  id: string | undefined,
  limit: number
) => {
  const res = await API.get(
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

export type bookingTypes = {
  tickets: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    travelDate: Date;
    tickets: {
      adult: number;
      child: number;
    };
    totalPrice: string;
    tourImage: string;
    status: "pending" | "canceled" | "verified";
    verifyNumber: string;
    userId: string;
    createAt: Date;
    updatedAt: Date;
  };
  totalPages: number;
  totalTickets: number;
};

export const getUserTickets = async (
  page: number,
  limit: number,
  search: string
) => {
  const res = await API.get<bookingTypes[]>(
    `/user/getAllTickets?page=${page}&limit=${limit}&search=${search}`
  );
  return res.data;
};

// update ticket
export const updateUserTickets = async (data) => {
  return await API.post(`/user/updateUserTicket`, data);
};

// remove ticket
export const removeUserTicket = async (id) => {
  return await API.delete(`/user/removeUserTicket/${id}`);
};
