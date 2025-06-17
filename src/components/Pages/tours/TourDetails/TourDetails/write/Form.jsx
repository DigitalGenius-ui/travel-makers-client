import React, { useEffect, useState } from "react";
import { BiSolidMessageAltDots } from "react-icons/bi";
import { Button } from "@chakra-ui/react";
import Rating from "./Rating";
import { useFormik } from "formik";
import * as yup from "yup";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import UploadImg from "../../../../profile/myPosts/Posts/CreatePost/UploadImg";
import TermAndCondition from "../../../../../../utils/TermAndCondition";
import useCreateData from "../../../../../../Hooks/useCreateData";
import { useCurrentUser } from "../../../../../../Context/UserContext";
import {
  createTourReview,
  uploadImages,
} from "../../../../../../api-call/tour-api";
import { TOURS_REVIEW_KEY } from "../../../../../../constants/react-query";

const Form = () => {
  const { currentUser } = useCurrentUser();

  const [ratingCount, setRatingCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { submitForm } = useCreateData({
    key: TOURS_REVIEW_KEY,
    func: createTourReview,
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const { rating, review, reviewImages } = values;
      const imagesLinks = await uploadImages(reviewImages);

      const inputData = {
        rating: rating.toString(),
        text: review,
        reviewImages: imagesLinks,
        toursId: id,
        userId: currentUser?.id,
      };

      await submitForm({
        inputData: inputData,
        dataMessage: "Review has been added",
      });

      resetForm({
        values: {
          rating: null,
          review: "",
          reviewImages: [],
          termCondition: false,
        },
      });
      navigate(`/tour/${id}#review`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const formikData = {
    initialValues: {
      rating: null,
      review: "",
      reviewImages: [],
      termCondition: false,
    },
    validationSchema: yup.object().shape({
      rating: yup.number().required(),
      review: yup.string().required().min(20),
      reviewImages: yup
        .array()
        .of(yup.string())
        .min(1, "At least one image should be uploaded."),
      termCondition: yup
        .boolean()
        .oneOf([true], "You must agree with terms and condition."),
    }),
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikData);

  useEffect(() => {
    ratingCount !== null && formik.setFieldValue("rating", ratingCount + 1);
  }, [ratingCount]);

  // catch form errors
  const handleError = (title) => {
    return formik.errors[title] && formik.touched[title];
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Rating
        handleError={handleError}
        formik={formik}
        ratingCount={ratingCount}
        setRatingCount={setRatingCount}
      />
      <h3 className="pb-4 font-bold">Tell us about your visit*</h3>
      <div className="bg-blue-100 p-2">
        <p className="text-xs font-bold text-gray-800 pb-4">
          <BiSolidMessageAltDots className="text-xl inline-block" />
          Tell us about your trip to inspire and help other travelers. Tips
          about transport, food, amenities, and the best way others can enjoy
          their trips are welcome!
        </p>
        <textarea
          onChange={(e) => formik.setFieldValue("review", e.target.value)}
          onBlur={formik.handleBlur}
          name="review"
          className={`w-full h-[200px] p-2 outline-none text-sm
          ${classNames({
            "border border-red-500": handleError("review"),
          })}`}
          placeholder="Write your review..."
        ></textarea>
        {handleError("review") && (
          <span className="text-red-500 text-xs capitalize">
            {formik.errors.review}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h2 className="font-bold">
          Share your photos
          <span className="text-gray-500 font-normal"> (Optional)</span>
        </h2>
        <p className="text-sm text-gray-500 py-2 mb-[2rem]">
          Why not upload some photos from your visit showing the facilities and
          environment etc?
        </p>
        <UploadImg formik={formik} imageName="reviewImages" />
        {formik.errors.reviewImages && (
          <span className="text-red-500 text-xs pt-1">
            {formik.errors.reviewImages}
          </span>
        )}
        <div className="py-[2rem]">
          <TermAndCondition formik={formik} />
        </div>
      </div>
      <Button
        isLoading={loading}
        type="submit"
        variant="solid"
        colorScheme="blue"
        size="lg"
        px="3rem"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
