import { Avatar, AvatarGroup, IconButton } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";

const UpcamingTrips = () => {
  return (
    <section className="dash-box !p-1">
      <div className="flex items-center justify-between p-2">
        <h1 className="font-semibold text-gray-700 text-sm">Upcoming Trips</h1>
        <IconButton
          size="xs"
          variant={"solid"}
          bgColor={"blue.500"}
          color={"white"}
        >
          <GoPlus size={18} />
        </IconButton>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <Tour key={i} />
      ))}
    </section>
  );
};

export default UpcamingTrips;

const Tour = () => {
  return (
    <div className="flex gap-2 cursor-pointer hover:bg-blue-100 p-2 rounded-md group">
      <img
        className="size-20 rounded-md object-cover"
        src="/help.jpg"
        alt="tour-img"
      />
      <div className="space-y-1 w-full">
        <p className="bg-blue-100 rounded-md py-[2px] px-2 text-xs w-fit capitalize font-semibold group-hover:bg-white">
          tour type
        </p>
        <h2 className="capitalize text-sm font-bold">tour title</h2>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <AvatarGroup size="xs" max={2}>
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar name="Ryan Florence" src="/male.jpg" />
              <Avatar name="Segun Adebayo" src="/female.jpg" />
            </AvatarGroup>
          </div>
          <div className="flex items-center text-gray-500">
            <span>
              <CiCalendarDate />
            </span>
            <p className="text-xs">12 - 17 july</p>
          </div>
        </div>
      </div>
    </div>
  );
};
