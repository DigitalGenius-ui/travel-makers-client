import { Outlet, useLocation } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import clsx from "clsx";
import PageBanner from "../../../utils/PageBanner";
import SideBar from "../SideBar/SideBar";

type pagesProps = "packages" | "gallery";
const grayPages: Record<pagesProps, string> = {
  packages: "packages",
  gallery: "gallery",
};

const DashboardLayout = () => {
  const page = useLocation().pathname.split("/")[1] as pagesProps;

  return (
    <>
      <PageBanner title={"Dashboard"} />
      <section
        className={clsx(
          "flex gap-4 relative min-h-[130vh]",
          grayPages[page] ? "bg-gray-100" : "bg-white"
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
