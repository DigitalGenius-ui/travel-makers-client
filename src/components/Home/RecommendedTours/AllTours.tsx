import { useState } from "react";
import PageBanner from "../../../utils/PageBanner";
import useGetTours from "../../../hooks/useGetTours";
import TourCard from "./TourCard";
import Screen from "../../../utils/Screen";
import Pagination from "../../../utils/Pagination";

const AllTours = () => {
  const { tourData } = useGetTours();
  if (!tourData) return;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil((tourData?.length ?? 0) / itemsPerPage);

  const newTours = tourData?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <PageBanner title="All Tours" />
      <Screen>
        <div className="grid grid-cols-resCol gap-4 my-6">
          {newTours?.map((item) => (
            <TourCard item={item} key={item.id} />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Screen>
    </div>
  );
};

export default AllTours;
