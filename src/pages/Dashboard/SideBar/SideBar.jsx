import React from "react";
import { sideBarMenu } from "./data";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useCurrentUser } from "../../../Context/UserContext";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";

const SideBar = () => {
  const { currentUser } = useCurrentUser();
  const { pathname } = useLocation();
  const split = pathname.split("/")[1];
  const path = `/${split}`;

  return (
    <aside className="flex-1 p-3 border-r border-gray-300 flex flex-col">
      <div className="flex items-center gap-3 pb-10 pt-5">
        <IoLocation size={23} className="text-blue-500" />
        <h1 className="text-xl font-bold text-gray-700">Travel Makers</h1>
      </div>
      <div className="flex flex-col flex-1">
        {sideBarMenu.map((item) => (
          <Link
            key={item.title}
            to={`${item.path}/${currentUser?.id}`}
            className={clsx(
              "flex items-center gap-5 p-3 rounded-md text-gray-800",
              path === item.path && "bg-blue-500 text-white"
            )}
          >
            <span>{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="mt-20">
        <button className="flex items-center gap-5 p-3 rounded-md text-gray-800">
          <span>
            <IoLogOutOutline size={23} />
          </span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
