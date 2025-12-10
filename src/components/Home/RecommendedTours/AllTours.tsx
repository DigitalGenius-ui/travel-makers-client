import { useState } from "react";
import PageBanner from "../../../utils/PageBanner";
import useGetTours from "../../../hooks/useGetTours";
import TourCard from "./TourCard";
import Screen from "../../../utils/Screen";
import Pagination from "../../../utils/Pagination";
import { CartLoading } from "../../../utils/Loadings";

const AllTours = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { tourData, isPending } = useGetTours(page, limit);
  const allTours = tourData?.allTours;

  return (
    <div>
      <PageBanner title="All Tours" />
      <Screen>
        <div className="grid grid-cols-resCol gap-4 my-6">
          {isPending ? (
            <>
              {Array.from({ length: limit }).map((_, i) => (
                <CartLoading key={i} />
              ))}
            </>
          ) : (
            allTours?.map((item) => <TourCard item={item} key={item.id} />)
          )}
        </div>
        <Pagination
          totalPages={tourData?.totalPages ?? 0}
          setCurrentPage={setPage}
          currentPage={page}
        />
      </Screen>
    </div>
  );
};

export default AllTours;
