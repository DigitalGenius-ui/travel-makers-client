import React from "react";
import TourCard from "./TourCard";
import useGetTours from "../../../hooks/useGetTours";
import Screen from "../../../utils/Screen";
import Title from "../../../utils/Title";
import { CartLoading } from "../../../utils/Loadings";

const Tours = () => {
  const { tourData, isPending } = useGetTours();

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
        {isPending ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <CartLoading key={i} />
            ))}
          </>
        ) : (
          <>
            {topReviewsPosts?.slice(0, 6).map((item, i) => (
              <TourCard item={item} key={i} />
            ))}
          </>
        )}
      </div>
    </Screen>
  );
};

export default Tours;
