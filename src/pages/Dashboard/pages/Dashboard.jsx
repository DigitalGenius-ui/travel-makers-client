import React from "react";
import Insight from "../../../components/Dashboard/Main/Insight";
import Charts from "../../../components/Dashboard/Main/Charts";

const Dashboard = () => {
  return (
    <section className="flex gap-3">
      <div className="flex-[3] space-y-7">
        <Insight />
        <Charts />
      </div>
      <div className="flex-1"></div>
    </section>
  );
};

export default Dashboard;
