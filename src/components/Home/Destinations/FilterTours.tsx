import PageBanner from "../../../utils/PageBanner";
import { useParams } from "react-router-dom";
import useGetTours from "../../../hooks/useGetTours";
import TourCard from "../RecommendedTours/TourCard";
import Screen from "../../../utils/Screen";

const FilterTours = () => {
  const { tourCat } = useParams();
  const newCat = tourCat?.replace("tours", "");
  const tourCategory = `${newCat} tours`;

  const { tourData } = useGetTours(0, 0, tourCategory);
  console.log(tourCategory);
  return (
    <>
      <PageBanner title={tourCategory} />
      <Screen>
        <div className="grid grid-cols-resCol gap-4 my-8">
          {tourData?.allTours?.map((item) => (
            <TourCard item={item} key={item.id} />
          ))}
        </div>
      </Screen>
    </>
  );
};

export default FilterTours;
