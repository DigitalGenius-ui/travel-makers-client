import React from "react";
import Insight from "../../../components/Dashboard/Main/Insight";
import Charts from "../../../components/Dashboard/Main/Charts";
import Trips from "../../../components/Dashboard/Main/Trips";
import Messages from "../../../components/Dashboard/Main/Messages";
import RecentBookings from "../../../components/Dashboard/Main/RecentBookings";
import UpcamingTrips from "../../../components/Dashboard/Main/UpcamingTrips";

const Dashboard = () => {
  return (
    <section className="flex gap-3 mb-5">
      <div className="flex-[3] space-y-5">
        <Insight />
        <Charts />
        <div className="flex gap-3">
          <Trips />
          <Messages />
        </div>
        <RecentBookings />
      </div>
      <div className="flex-1">
        <UpcamingTrips />
      </div>
    </section>
  );
};

export default Dashboard;
