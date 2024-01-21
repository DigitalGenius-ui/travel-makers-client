import { Button, Input, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import useGetTours from "../../../../../../Hooks/useGetTours";
import useCreateData from "../../../../../../Hooks/useCreateData";
import WhiteBg from "../../../../../../utils/WhiteBg";
import UploadImg from "./UploadImg";
import LocationDrop from "./LocationDrop";
import TermAndCondition from "../../../../../../utils/TermAndCondition";
import { createMoment } from "../../../../../../FetchData/User/UserDetails";
import { uploadImages } from "../../../../../../Helpers/uploadImage";
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { createPostSchema } from "../../../InputsSchemas";

const CreatePost = () => {
  const [loading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUser();
  const { tourData } = useGetTours();

  const navigate = useNavigate();

  const { submitForm } = useCreateData({
    key: "user",
    func: createMoment,
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { title, desc, location } = values;
      const imagesLinks = await uploadImages(values.postImages);

      if (imagesLinks.length === 0) return;

      const inputData = {
        title,
        desc,
        location,
        postImages: imagesLinks,
        userId: currentUser.id,
        id: "",
      };
      await submitForm({ inputData, dataMessage: "Post has been created" });
      navigate(-1);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formikConfigs = {
    initialValues: {
      title: "",
      desc: "",
      location: "",
      postImages: [],
      termCondition: false,
    },
    validationSchema: createPostSchema,
    onSubmit: handleSubmit,
  };

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const isError = (input) => {
    return formik?.errors[input] && formik?.touched[input];
  };

  const formik = useFormik(formikConfigs);

  return (
    <WhiteBg>
      <h3 className="text-xl font-bold pb-[1.5rem]">Add a Trip Moment</h3>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-semibold">Share your photos</h2>
          <p className="text-sm font-medium text-gray-500 pb-5">
            We recommend uploading pictures of famous landmarks if you can.
          </p>
          <UploadImg formik={formik} imageName="postImages" />
          {formik.errors.postImages && (
            <span className="text-red-500 text-xs pt-1">
              {formik.errors.postImages}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label className="font-medium">Add Title</label>
          <Input
            isInvalid={isError("title")}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            name="title"
            placeholder="Posts with title are featured more often..."
            variant="flushed"
            fontSize="sm"
            size="sm"
          />
          {isError("title") && (
            <span className="text-red-500 text-xs pt-1">
              {formik.errors.title}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label className="font-medium">Tell us about your trip</label>
          <Textarea
            isInvalid={isError("desc")}
            onBlur={formik.handleBlur}
            onChange={handleChange}
            name="desc"
            placeholder="Long description will lead to high traffic..."
            fontSize="sm"
            rows={12}
            resize="none"
          />
          {isError("desc") && (
            <span className="text-red-500 text-xs pt-1">
              {formik.errors.desc}
            </span>
          )}
        </div>
        <div className="space-y-1 relative">
          <label className="font-medium">Add Location</label>
          <Input
            isInvalid={isError("location")}
            onBlur={formik.handleBlur}
            onChange={handleChange}
            name="location"
            value={formik.values.location}
            placeholder="Please add location..."
            variant="flushed"
            fontSize="sm"
            size="sm"
          />
          {isError("location") && (
            <span className="text-red-500 text-xs pt-1">
              {formik.errors.desc}
            </span>
          )}
          {/* location dropDown  */}
          <LocationDrop formik={formik} data={tourData} />
          {/* term and condition  */}
          <TermAndCondition formik={formik} />
        </div>
        <Button
          isLoading={loading}
          type="submit"
          variant="solid"
          colorScheme="blue"
          size="lg"
          px="3rem">
          Submit
        </Button>
      </form>
    </WhiteBg>
  );
};

export default CreatePost;
