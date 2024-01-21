import React from "react";
import Head from "../../../../../../utils/Head";
import WhiteBg from "../../../../../../utils/WhiteBg";
import { useParams } from "react-router-dom";
import useGetTours from "../../../../../../Hooks/useGetTours";
import Form from "./Form";

const CreateReview = () => {
  const { id } = useParams();
  const { tourData } = useGetTours();

  const getSingleBook = tourData?.find((item) => item?.id === id);
  return (
    <div className="bg-darkBlue h-full">
      <Head />
      <WhiteBg write={true}>
        <h2 className="font-bold text-xl">{getSingleBook?.title}</h2>
        <Form />
      </WhiteBg>
    </div>
  );
};

export default CreateReview;
