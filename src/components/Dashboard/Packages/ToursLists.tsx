import { VerticaleCardLoading } from "../../../utils/Loadings";
import { FiFilter } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { RiStarSFill } from "react-icons/ri";
import clsx from "clsx";
import type { tourReview, tourType } from "../../../types/tours-type";
import type { tourWithReviwes } from "../../../api-call/tour-api";
import { useState, type SetStateAction } from "react";
import SearchInput from "../../../utils/SearchInput";
import { ActionButton } from "../../../utils/ActionButton";

type tourListsProps = {
  tourData: tourWithReviwes[] | undefined;
  isPending: boolean;
  setActivePackage: React.Dispatch<SetStateAction<tourWithReviwes>>;
  activePackage: tourWithReviwes;
};

const ToursLists = ({
  tourData,
  isPending,
  setActivePackage,
  activePackage,
}: tourListsProps) => {
  const [search, setSearch] = useState("");
  return (
    <section className="dash-box flex-1">
      <div className="flex items-center gap-1">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          bg="white"
        />
        <ActionButton py={5} onClick={() => console.log("search")}>
          <FiFilter size={15} />
        </ActionButton>
      </div>
      <>
        {isPending ? (
          <VerticaleCardLoading />
        ) : (
          <div className="space-y-2 mt-6">
            {tourData?.length === 0 ? (
              <p>No tours are avaliable!</p>
            ) : (
              tourData
                ?.slice(0, 8)
                .map((tour) => (
                  <Tour
                    key={tour.id}
                    tour={tour}
                    setActivePackage={setActivePackage}
                    activePackage={activePackage}
                  />
                ))
            )}
          </div>
        )}
      </>
    </section>
  );
};

export default ToursLists;

type tourProps = {
  tour: tourType & {
    reviews: tourReview[];
  };
  setActivePackage: React.Dispatch<SetStateAction<tourWithReviwes>>;
  activePackage: tourWithReviwes;
};
const Tour = ({ tour, setActivePackage, activePackage }: tourProps) => {
  const { title, price, reviews, tourImages } = tour;
  return (
    <div
      onClick={() => setActivePackage(tour)}
      className={clsx(
        "flex items-center gap-2 hover:bg-blue-50 cursor-pointer group p-2 rounded-md",
        activePackage?.id === tour.id && "bg-blue-50"
      )}
    >
      <img
        className="size-16 rounded-md object-cover"
        src={tourImages[0]}
        alt="tour-img"
      />
      <div className="flex-1">
        <h1 className="line-clamp-1 font-semibold">{title}</h1>
        <div className="flex items-center gap-1 text-xs text-darkText">
          <p className="flex items-center bg-gray-100 p-1 rounded-md group-hover:bg-white">
            <HiOutlineLocationMarker /> Melbourn / Australia
          </p>
          <p className="flex items-center bg-gray-100 p-1 rounded-md group-hover:bg-white">
            <IoTimeOutline /> 6 Days / 5 Nights
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <p className="text-xs flex items-center">
            <span className="text-yellow-500 text-sm">
              <RiStarSFill />
            </span>
            {reviews?.length}
          </p>
          <p>
            <span className="text-xl text-blue-500">${price}</span>/
            <span className="text-darkText">person</span>
          </p>
        </div>
      </div>
    </div>
  );
};
