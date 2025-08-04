import React from "react";
import Stars from "../../../utils/Stars";
import { Button } from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiDuration } from "react-icons/gi";
import { LuUsersRound } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";

const TourDetails = ({ activePackage, isPending }) => {
  const { title, description, tourImages, reviews, price } = activePackage;
  const toursDetails = () => (
    <div className="flex-[1.5] space-y-5">
      <img
        className="rounded-md w-full"
        src={tourImages?.[0]}
        alt="tour-image"
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="line-clamp-1 font-semibold text-gray-700 text-xl">
            {title}
          </h1>
          <div>
            <Stars review={+reviews?.length} />
          </div>
        </div>
        <Button size={"sm"} color={"blue.500"}>
          Edit Package
        </Button>
      </div>
      {/* details  */}
      <div className="space-y-1">
        <TourDetailsBox
          icon={<HiOutlineLocationMarker size={13} />}
          title={"location"}
          value={"Melbourne / Australia"}
        />
        <TourDetailsBox
          icon={<GiDuration size={13} />}
          title={"duration"}
          value={"6 days / 5 nights"}
        />
        <TourDetailsBox
          icon={<LuUsersRound size={13} />}
          title={"quata"}
          value={"20 participants"}
        />
        <TourDetailsBox
          icon={<MdAttachMoney size={13} />}
          title={"location"}
          value={
            <div>
              <span className="text-blue-700 font-semibold">${price}</span>
              <span className="lowercase"> / per person</span>
            </div>
          }
        />
      </div>
      {/* about part  */}
      <div>
        <h2 className="uppercase text-gray-500 text-sm">about</h2>
        <p className="mt-4 text-sm text-gray-700 leading-tight">
          {description}
        </p>
      </div>
      {/* line  */}
      <div className="w-full border-b border-gray-300" />
      {/* includes  */}
      <div>
        <h2 className="uppercase text-gray-500 text-sm">includes</h2>
        <div className="box mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-1">
              <span className="mt-1 size-4 bg-blue-500 text-white flex items-center justify-center rounded-full">
                <IoIosCheckmark size={25} />
              </span>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex-1 tablet:flex-[2] flex flex-col tablet:flex-row gap-3">
      {isPending ? (
        <div className="w-full space-y-2">
          <p className="w-full h-40 bg-gray-200 animate-pulse" />
          <p className="w-full h-10 bg-gray-200 animate-pulse" />
        </div>
      ) : (
        <>
          {toursDetails()}
          <div className="flex-1">
            <h1 className="capitalize text-gray-700 font-semibold text-xl border-l border-gray-400 pl-3 pt-2 pb-8">
              trip schedule
            </h1>
            <ScheduleBox />
            <ScheduleBox />
            <ScheduleBox />
            <ScheduleBox />
            <ScheduleBox />
            <ScheduleBox />
          </div>
        </>
      )}
    </section>
  );
};

export default TourDetails;

const TourDetailsBox = ({ icon, title, value }) => {
  return (
    <div className="flex items-center gap-5 text-sm">
      <div className="flex items-center gap-1 text-gray-500">
        <p>{icon}</p>
        <h3 className="capitalize">{title}</h3>
      </div>
      <h3 className="capitalize">{value}</h3>
    </div>
  );
};

const ScheduleBox = () => (
  <>
    <div className="flex items-center gap-2">
      <span className="block size-2 bg-gray-300 rounded-full -ml-[4px]" />
      <h1 className="text-sm font-semibold text-gray-700">
        Day 1 - Arrivale in Australia
      </h1>
    </div>
    <div className="border-l border-gray-400 pl-3 pt-2 pb-8 text-sm space-y-3">
      <div className="space-y-1">
        <h5 className="capitalize text-gray-400 text-xs">activity:</h5>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic
          sapiente vero?
        </p>
      </div>
      <div className="space-y-1">
        <h5 className="capitalize text-gray-400 text-xs">evening:</h5>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic
          sapiente vero?
        </p>
      </div>
    </div>
  </>
);
