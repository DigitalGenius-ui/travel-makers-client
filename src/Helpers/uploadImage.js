import axios from "axios";

export const uploadImages = async (inputValue) => {
  const imagesLinks = [];
  try {
    if (inputValue) {
      for (let i = 0; i < inputValue.length; i++) {
        const formData = new FormData();

        formData.append("file", inputValue[i]);
        formData.append("upload_preset", "travel_maker");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dh322c4tf/image/upload",
          formData
        );

        const data = await res.data;
        imagesLinks.push(data?.secure_url);
      }
    }
    return imagesLinks;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadSingleImage = async (inputValue) => {
  let imageUrl = "";
  try {
    if (inputValue) {
      const formData = new FormData();

      formData.append("file", inputValue);
      formData.append("upload_preset", "travel_maker");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dh322c4tf/image/upload",
        formData
      );

      const data = await res.data;
      imageUrl += data?.secure_url;
    }
    return imageUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};
