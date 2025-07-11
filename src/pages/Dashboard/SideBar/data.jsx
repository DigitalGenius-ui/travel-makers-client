import { LuLayoutDashboard } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";
import { LuBookmarkCheck } from "react-icons/lu";
import { MdTravelExplore } from "react-icons/md";
import { RiGuideFill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { LuMessageSquareDashed } from "react-icons/lu";
import { GrLike } from "react-icons/gr";

export const sideBarMenu = (isMobile) => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={isMobile ? 23 : 19} />,
  },
  {
    title: "Packages",
    path: "/packages",
    icon: <TbPackages size={isMobile ? 23 : 19} />,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: <LuBookmarkCheck size={isMobile ? 23 : 19} />,
  },
  {
    title: "Travlers",
    path: "/travlers",
    icon: <MdTravelExplore size={isMobile ? 23 : 19} />,
  },
  {
    title: "Guides",
    path: "/guides",
    icon: <RiGuideFill size={isMobile ? 23 : 19} />,
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: <GrGallery size={isMobile ? 23 : 19} />,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <LuMessageSquareDashed size={isMobile ? 23 : 19} />,
  },
  {
    title: "Feadbacks",
    path: "/feadbacks",
    icon: <GrLike size={isMobile ? 23 : 19} />,
  },
];
