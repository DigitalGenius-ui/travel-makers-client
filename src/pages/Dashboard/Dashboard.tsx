import Insight from "../../components/Dashboard/Main/Insight";
import Charts from "../../components/Dashboard/Main/Charts";
import Trips from "../../components/Dashboard/Main/Trips";
import Messages from "../../components/Dashboard/Main/Messages";
import RecentBookings from "../../components/Dashboard/Main/RecentBookings";
import UpcamingTrips from "../../components/Dashboard/Main/UpcamingTrips";
import RecentTravlers from "../../components/Dashboard/Main/RecentTravlers";

const Dashboard = () => {
  return (
    <section className="flex flex-col xl:flex-row gap-3 mb-5">
      <div className="flex-[3] space-y-3">
        <Insight />
        <Charts />
        <div className="flex flex-col md:flex-row gap-3">
          <Trips />
          <Messages />
        </div>
        <RecentBookings />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row gap-3 xl:flex-col h-fit">
        <UpcamingTrips />
        <RecentTravlers />
      </div>
    </section>
  );
};

export default Dashboard;
