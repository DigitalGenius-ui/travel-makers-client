import { API, publicAPI } from "../config/ApiClient";

// get current user details
export const getCurrentUser = async () => {
  return await API.get(`/user`);
};

// get user by id details
export const getSingleUser = async (id) => {
  return await publicAPI.get(`/user/getSingleUser/${id}`);
};

// get all users
export const getAllUsers = (page, limit, type = "manage", search) => {
  return API.get(
    `/user/getAllUsers?page=${page}&limit=${limit}&type=${type}&search=${search}`
  );
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
export const removeMoment = async (id) => {
  return await API.delete(`/user/removePost/${id}`);
};

// get single moment post
export const getSingleMoment = async (id) => {
  return await API.get(`/user/singleMoment/${id}`);
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
export const getBooking = async (page, limit) => {
  return await API.get(`/user/getUserBooking?page=${page}&limit=${limit}`);
};

// get Moments
export const getMoments = async (page, id, limit) => {
  return await API.get(
    `/user/getUserMoments/${id}?page=${page}&limit=${limit}`
  );
};

// get getUserReviews
export const getUserReviews = async (page, limit) => {
  return await API.get(`/user/getUserReviews?page=${page}&limit=${limit}`);
};

// get all tickets
export const getUserTickets = async (page, limit, search) => {
  return await API.get(
    `/user/getAllTickets?page=${page}&limit=${limit}&search=${search}`
  );
};

// update ticket
export const updateUserTickets = async (data) => {
  return await API.post(`/user/updateUserTicket`, data);
};

// remove ticket
export const removeUserTicket = async (id) => {
  return await API.delete(`/user/removeUserTicket/${id}`);
};
