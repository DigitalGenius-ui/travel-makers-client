import React from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import PageBanner from "../../utils/PageBanner";
import LayoutHeader from "./LayoutHeader";

const DashboardLayout = () => {
  return (
    <>
      <PageBanner title={"Dashboard"} />
      <section className="flex gap-4 relative">
        <SideBar />
        <div className="overflow-auto pl-[5rem] tablet:pl-0 flex-[5.5] pr-5">
          <div className="!min-w-[600px] md:!min-w-auto">
            <LayoutHeader />
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
