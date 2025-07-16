import React from "react";
import RecentBookings from "../../../components/Dashboard/Main/RecentBookings";

const Bookings = () => {
  return (
    <div className="my-5">
      <RecentBookings showMore={true} />
    </div>
  );
};

export default Bookings;
