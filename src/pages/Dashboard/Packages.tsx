import { useEffect, useState } from "react";
import TourDetails from "../../components/Dashboard/Packages/TourDetails";
import ToursLists from "../../components/Dashboard/Packages/ToursLists";
import useGetTours from "../../hooks/useGetTours";
import type { tourRewviewsCount } from "../../types/tours-type";
import { ActionButton } from "../../utils/ActionButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Packages = () => {
  const limit = 12;
  const [page, setPage] = useState(1);

  const { tourData, isPending } = useGetTours(page, limit);

  const [activePackage, setActivePackage] = useState<tourRewviewsCount>(
    {} as tourRewviewsCount
  );

  const newTour = tourData?.allTours || [];
  const totalPages = tourData?.totalPages || 0;

  useEffect(() => {
    if (tourData && newTour?.length > 0) {
      setActivePackage(newTour?.[0]);
    }
  }, [newTour]);

  const increment = () =>
    setPage((prev) => (prev < totalPages ? prev + 1 : totalPages));
  const decrement = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="bg-white rounded-md shadow-md p-3 flex flex-col lg:flex-row gap-3 mb-3 ">
      <div className="dash-box">
        <ToursLists
          tourData={newTour}
          isPending={isPending}
          setActivePackage={setActivePackage}
          activePackage={activePackage}
        />
        <div className="py-4 text-end space-x-2">
          <ActionButton
            disabled={page === 1}
            variant={"outline"}
            onClick={decrement}
          >
            <IoIosArrowBack />
          </ActionButton>
          <ActionButton
            disabled={page === totalPages}
            variant={"outline"}
            onClick={increment}
          >
            <IoIosArrowForward />
          </ActionButton>
        </div>
      </div>
      <TourDetails isPending={isPending} activePackage={activePackage} />
    </section>
  );
};

export default Packages;
