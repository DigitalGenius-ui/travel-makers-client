import { PiAirplaneTiltLight } from "react-icons/pi";
import ColorBox from "../../../utils/ColorBox";
import CustomeMenu from "../../../utils/CustomeMenu";
import { Button } from "@chakra-ui/react";
import useGetTours from "../../../Hooks/useCreateData";
import { FaRegClock } from "react-icons/fa";
import { useMemo, useState } from "react";

const TripsCalcs = ({ title, amount }) => {
  return (
    <div className="flex items-center gap-1 text-xs">
      <ColorBox />
      <p className="">{title}</p>
      <p className="font-bold">{amount}</p>
    </div>
  );
};

const Trips = () => {
  const { tourData } = useGetTours();
  const [travelFilter, setTravelFilter] = useState("");

  function totalTrips() {
    return (
      <div className="dash-box flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="size-14 bg-blue-50 rounded-md flex items-center justify-center text-blue-500">
            <PiAirplaneTiltLight size={28} />
          </span>
          <div className="flex flex-col">
            <h1 className="text-sm">Total Trips</h1>
            <p className="text-xl font-bold text-gray-700">4000</p>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-4 bg-blue-50 rounded-e-sm" />
            <div className="flex-1 h-4 bg-blue-200" />
            <div className="flex-1 h-4 bg-blue-300 rounded-e-sm" />
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between">
            <TripsCalcs title="Done" amount={250} />
            <TripsCalcs title="Booked" amount={50} />
            <TripsCalcs title="Canceled" amount={350} />
          </div>
        </div>
      </div>
    );
  }

  function travelPackages() {
    const menus = useMemo(() => {
      return [...new Set(tourData?.map((item) => item.category))];
    }, [tourData]);

    return (
      <div className="dash-box space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Travel Packages</h1>
          <div className="flex items-center gap-2">
            <CustomeMenu
              value={travelFilter}
              onChange={(e) => setTravelFilter(e.target.value)}
              menus={menus}
            />
            <Button variant={"outline"} size={"sm"}>
              View All
            </Button>
          </div>
        </div>
        <div className="bg-blue-200 p-2 rounded-md box !gap-2">
          {tourData?.slice(3, 6).map((item) => (
            <TourCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <section className="flex-[2.5] space-y-5">
      {totalTrips()}
      {travelPackages()}
    </section>
  );
};

export default Trips;

const TourCard = ({ item }) => {
  const { category, price, tourDuration, city } = item;
  const img = item?.tourImages[1];

  return (
    <div className="p-2 rounded-md bg-white space-y-1">
      <div className="relative">
        <img
          className="rounded-md w-full h-32 object-cover"
          src={img}
          alt="tour-img"
        />
        <p
          className="bg-white rounded-md px-2 py-1 absolute top-1 left-1 text-xs 
            capitalize text-blue-500 shadow-md"
        >
          {category}
        </p>
      </div>
      <h1 className="font-bold text-sm text-gray-700 line-clamp-1">{city}</h1>
      <div className="flex items-center gap-1 text-darkText">
        <span>
          <FaRegClock size={12} />
        </span>
        <p className="text-xs">{tourDuration} hours</p>
      </div>
      <div className="flex items-end justify-between gap-1 !mt-3">
        <p className="text-md font-semibold leading-tight">
          ${price}
          <span className="block text-[10px] text-darkText font-normal">
            per person
          </span>
        </p>
        <Button
          variant={"solid"}
          bgColor={"blue.500"}
          size={"xs"}
          color={"white"}
        >
          See Details
        </Button>
      </div>
    </div>
  );
};
