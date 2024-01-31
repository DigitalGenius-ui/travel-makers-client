import axios from "axios";

// get current user details
axios.defaults.withCredentials = true;

export const getUserDetails = async (id) => {
  try {
    const res = await axios.get(`/api/user/${id}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

// update profile data
export const profileDetailsUpdate = async (data) => {
  try {
    const details = await axios.post(`/api/user/profile`, data);
    return details;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create moment post
export const createMoment = async (data) => {
  try {
    const post = await axios.post(`/api/user/createPost`, data);
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create moment post
export const removeMoment = async (id) => {
  try {
    const removePost = await axios.delete(`/api/user/removePost/${id}`);
    return removePost;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get single moment post
export const getSingleMoment = async (id) => {
  try {
    const singleMoment = await axios.get(`/api/user/singleMoment/${id}`);
    return singleMoment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create moment post comment
export const momentPostCommentCreate = async (data) => {
  try {
    const momentComment = await axios.post(`/api/user/createComment`, data);
    return momentComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create moment post comment
export const momentPostCommentRemove = async (id) => {
  try {
    const removeComment = await axios.delete(`/api/user/removeComment/${id}`);
    return removeComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// change profile password
export const changeProfilePassword = async (data) => {
  try {
    const changePassword = await axios.put(
      `/api/user/changePassword/${data.userId}`,
      data
    );
    return changePassword;
  } catch (error) {
    throw new Error(error.message);
  }
};
