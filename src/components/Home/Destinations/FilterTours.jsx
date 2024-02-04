import React from "react";
import PageBanner from "../../../utils/PageBanner";
import { useParams } from "react-router-dom";
import useGetTours from "../../../Hooks/useGetTours";
import TourCard from "../RecommendedTours/TourCard";
import Screen from "../../../utils/Screen";

const FilterTours = () => {
  const { tourData } = useGetTours();

  const { tourCat } = useParams();
  const newCat = tourCat.replace("tours", "");
  const tourCategory = `${newCat} tours`;

  const filterTours = tourData?.filter(
    (item) => item.category === tourCategory
  );
  return (
    <>
      <PageBanner title={tourCategory} />
      <Screen>
        <div className="grid grid-cols-resCol gap-4 my-8">
          {filterTours?.map((item) => (
            <TourCard item={item} key={item.id} />
          ))}
        </div>
      </Screen>
    </>
  );
};

export default FilterTours;
