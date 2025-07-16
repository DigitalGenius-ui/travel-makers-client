import SideBar from "./SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import PageBanner from "../../utils/PageBanner";
import LayoutHeader from "./LayoutHeader";
import clsx from "clsx";

const DashboardLayout = () => {
  const page = useLocation().pathname.split("/")[1];

  return (
    <>
      <PageBanner title={"Dashboard"} />
      <section
        className={clsx(
          "flex gap-4 relative min-h-[130vh]",
          page === "packages" ? "bg-gray-100" : "bg-white"
        )}
      >
        <SideBar />
        <div className="overflow-auto pl-[5rem] flex-[5.5] pr-5">
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
