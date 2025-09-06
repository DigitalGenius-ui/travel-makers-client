import { sideBarMenu } from "./data";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useCurrentUser } from "../../../context/UserContext";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowSize from "../../../hooks/useWindowSize";

const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = useRef<gsap.core.Timeline>({} as gsap.core.Timeline);

  const { currentUser } = useCurrentUser();
  const { width } = useWindowSize();
  const { pathname } = useLocation();
  const split = pathname.split("/")[1];
  const path = `/${split}`;

  const isMobile = width < 1200;
  useGSAP(() => {
    gsap.set("#sidebar", {
      width: "4rem",
    });
    gsap.set(".btnTitle", {
      y: -30,
      opacity: 0,
    });
    gsap.set(".dashLogo", {
      x: -30,
      opacity: 0,
    });

    toggleMenu.current = gsap
      .timeline({ paused: true })
      .to(
        "#sidebar",
        {
          width: "15rem",
          dusration: 1,
        },
        "a"
      )
      .to(
        ".btnTitle",
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          stagger: 0.1,
          delay: 1,
        },
        "a"
      )
      .to(
        ".dashLogo",
        {
          x: 0,
          opacity: 1,
          duration: 0.1,
          stagger: 0.1,
          delay: 0.8,
        },
        "a"
      );
  }, []);

  useEffect(() => {
    if (showMenu) {
      toggleMenu?.current?.play();
    } else {
      toggleMenu?.current?.reverse();
    }
  }, [showMenu]);

  return (
    <aside
      id="sidebar"
      className={clsx(
        `absolute top-0 bottom-0 p-2 border-r border-gray-300 flex flex-col bg-white !z-10
        transition-all duration-500 overflow-hidden`
      )}
    >
      <div
        className={clsx(
          "absolute top-6 right-4 z-10 transition-all duration-500",
          showMenu && "right-2"
        )}
      >
        <IconButton
          aria-label="icon-button"
          onClick={() => setShowMenu((prev) => !prev)}
          className={"w-fit"}
          size="sm"
          variant={"outline"}
        >
          <span
            className={clsx(
              `transition-all duration-500`,
              showMenu && "rotate-180"
            )}
          >
            <IoIosArrowBack />
          </span>
        </IconButton>
      </div>
      <div className="flex items-center gap-3 pb-10 pt-5 dashLogo">
        <IoLocation size={23} className="text-blue-500" />
        <h1 className="text-xl font-bold text-gray-700 line-clamp-1">
          Travel Makers
        </h1>
      </div>
      <div className="flex flex-col flex-1">
        {sideBarMenu(isMobile).map((item) => (
          <Tooltip label={item.title} key={item.title} placement="right">
            <Link
              to={`${item.path}/${currentUser?.id}`}
              className={clsx(
                "flex items-center gap-5 p-3 rounded-md text-gray-800",
                path === item.path && "bg-blue-500 text-white",
                path !== item.path && "hover:bg-blue-100",
                !menubar && "justify-center"
              )}
            >
              <span>{item.icon}</span>
              <span className="btnTitle">{item.title}</span>
            </Link>
          </Tooltip>
        ))}
      </div>
      <div className="mt-20">
        <Tooltip label="Logout" placement="right">
          <button className="flex items-center gap-5 p-3 rounded-md text-gray-800 hover:bg-blue-100 w-full">
            <span>
              <IoLogOutOutline size={isMobile ? 27 : 23} />
            </span>
            <span className="btnTitle">Sign Out</span>
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default SideBar;
