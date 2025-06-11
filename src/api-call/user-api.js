import axios from "axios";
import { API, publicAPI } from "../config/ApiClient";

// get current user details
export const getCurrentUser = async () => {
  try {
    const res = await API.get(`/user`);
    return res;
  } catch (error) {
    throw error;
  }
};

// get user by id details
export const getSingleUser = async (id) => {
  try {
    const res = await publicAPI.get(`/user/getSingleUser/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

// update profile data
export const profileDetailsUpdate = async (data) => {
  try {
    const details = await API.post(`/user/profile`, data);
    return details;
  } catch (error) {
    throw error;
  }
};

// update profile image
export const updateProfileImage = async (userImg) => {
  try {
    const res = await API.post(`/user/uploadImage`, { userImg });
    return res;
  } catch (error) {
    throw error;
  }
};

// create moment post
export const createMoment = async (data) => {
  try {
    const post = await API.post(`/user/createPost`, data);
    return post;
  } catch (error) {
    throw error;
  }
};

// create moment post
export const removeMoment = async (id) => {
  try {
    const removePost = await API.delete(`/user/removePost/${id}`);
    return removePost;
  } catch (error) {
    throw error;
  }
};

// get single moment post
export const getSingleMoment = async (id) => {
  try {
    const singleMoment = await API.get(`/user/singleMoment/${id}`);
    return singleMoment;
  } catch (error) {
    throw error;
  }
};

// create moment post comment
export const momentPostCommentCreate = async (data) => {
  try {
    const momentComment = await API.post(`/user/createComment`, data);
    return momentComment;
  } catch (error) {
    throw error;
  }
};

// create moment post comment
export const momentPostCommentRemove = async (id) => {
  try {
    const removeComment = await API.delete(`/user/removeComment/${id}`);
    return removeComment;
  } catch (error) {
    throw error;
  }
};

// change profile password
export const changeProfilePassword = async (data) => {
  try {
    const changePassword = await API.put(
      `/user/changePassword/${data.userId}`,
      data
    );
    return changePassword;
  } catch (error) {
    throw error;
  }
};
