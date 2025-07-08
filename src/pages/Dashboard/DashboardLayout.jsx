import React from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import PageBanner from "../../utils/PageBanner";
import LayoutHeader from "./LayoutHeader";

const DashboardLayout = () => {
  return (
    <>
      <PageBanner title={"Dashboard"} />
      <section className="flex gap-4">
        <SideBar />
        <div className="flex-[4] pr-5">
          <LayoutHeader />
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
