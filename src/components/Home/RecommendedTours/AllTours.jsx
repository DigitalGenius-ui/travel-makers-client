import React from "react";
import PageBanner from "../../../utils/PageBanner";
import useGetTours from "../../../Hooks/useGetTours";
import TourCard from "./TourCard";
import Screen from "../../../utils/Screen";

const AllTours = () => {
  const { tourData } = useGetTours();
  return (
    <div>
      <PageBanner title="All Tours" />
      <Screen>
        <div className="grid grid-cols-resCol gap-4 my-6">
          {tourData?.map((item) => (
            <TourCard item={item} key={item.id} />
          ))}
        </div>
        <h2>Pagination goes here</h2>
      </Screen>
    </div>
  );
};

export default AllTours;
