import React from "react";
import TourCard from "./TourCard";
import useGetTours from "../../../Hooks/useGetTours";
import Screen from "../../../utils/Screen";
import Title from "../../../utils/Title";

const Tours = () => {
  const { tourData } = useGetTours();

  const topReviewsPosts = tourData?.sort(
    (a, b) => b.reviews?.length - a.reviews?.length
  );

  return (
    <Screen>
      <Title
        title="Recommended Tours"
        tag="Most Branding tours right now"
        btnText="See all tours & activities"
        link="/allTours"
      />
      <div className="grid grid-cols-resCol gap-10 mb-[4rem]">
        {topReviewsPosts?.slice(0, 6).map((item, i) => (
          <TourCard item={item} key={i} />
        ))}
      </div>
    </Screen>
  );
};

export default Tours;
