import { PiAirplaneTiltLight } from "react-icons/pi";
import ColorBox from "../../../utils/ColorBox";
import { Button } from "@chakra-ui/react";
import { FaRegClock } from "react-icons/fa";
import { useRef } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { DASH_TRIPS_PACKAGE } from "../../../constants/react-query";
import { getTripAndPackage } from "../../../api-call/dashboard-api";
import useErrorToest from "../../../hooks/useErrorToest";
import { Link, useParams } from "react-router-dom";
import useGetTours from "../../../hooks/useGetTours";

const COLORS: Record<string, string> = {
  Canceled: "rgb(239 246 255)",
  Pending: "rgb(191 219 254)",
  Done: "rgb(147 197 253)",
};
const Trips = () => {
  const { tourData } = useGetTours();
  const { id } = useParams();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartWidth = chartRef?.current?.offsetWidth;

  const { data, isPending, error, isError } = useQuery({
    queryKey: [DASH_TRIPS_PACKAGE],
    queryFn: async () => await getTripAndPackage(),
  });
  useErrorToest({ error, isError });

  const chartBoxes = data?.trips;

  function totalTrips() {
    return (
      <div className="dash-box flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="size-14 bg-blue-50 rounded-md flex items-center justify-center text-blue-500">
            <PiAirplaneTiltLight size={28} />
          </span>
          <div className="flex flex-col">
            <h1 className="text-sm">Total Trips</h1>
            <p className="text-xl font-bold text-gray-700">
              {data?.totalTrips}
            </p>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div ref={chartRef} className="flex items-center justify-center">
            {chartBoxes?.map((item, i) => (
              <div
                key={item.amount}
                style={{
                  flex: `${(item.amount ?? 0 / chartWidth!) * 100}%`,
                  backgroundColor: COLORS[item.title],
                }}
                className={clsx(
                  `flex-1 h-4`,
                  i === 0 || (i === 2 && "rounded-e-sm")
                )}
              />
            ))}
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between">
            {chartBoxes?.map((item) => (
              <TripsCalcs
                key={item.title}
                title={item.title}
                amount={item.amount}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function travelPackages() {
    return (
      <div className="dash-box space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Travel Packages</h1>
          <div className="flex items-center gap-2">
            <Link to={`/packages/${id}`} replace>
              <Button variant={"outline"} size={"sm"}>
                View All
              </Button>
            </Link>
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
      {isPending ? (
        <p className="w-full h-20 bg-gray-200 animate-pulse rounded-md" />
      ) : (
        totalTrips()
      )}
      {travelPackages()}
    </section>
  );
};

export default Trips;

const TripsCalcs = ({
  title,
  amount,
}: {
  title: string;
  amount: number | undefined;
}) => {
  return (
    <div className="flex items-center gap-1 text-xs">
      <ColorBox style={{ backgroundColor: COLORS[title] }} />
      <p>{title}</p>
      <p className="font-bold">{amount}</p>
    </div>
  );
};

const TourCard = ({ item }: { item: any }) => {
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
