import { useEffect, useState } from "react";
import TourDetails from "../../components/Dashboard/Packages/TourDetails";
import ToursLists from "../../components/Dashboard/Packages/ToursLists";
import useGetTours from "../../Hooks/useGetTours";

const Packages = () => {
  const { tourData, isPending } = useGetTours();
  const [activePackage, setActivePackage] = useState({});

  useEffect(() => {
    if (tourData && tourData.length > 0) {
      setActivePackage(tourData[0]);
    }
  }, [tourData]);

  return (
    <section className="bg-white rounded-md shadow-md p-3 flex flex-col lg:flex-row gap-3 mb-3 ">
      <ToursLists
        tourData={tourData}
        isPending={isPending}
        setActivePackage={setActivePackage}
        activePackage={activePackage}
      />
      <TourDetails isPending={isPending} activePackage={activePackage} />
    </section>
  );
};

export default Packages;
