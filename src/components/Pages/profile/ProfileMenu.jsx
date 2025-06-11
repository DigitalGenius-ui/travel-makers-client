import { useState } from "react";
import UserMenu from "./UserMenu";
import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import { dropMenu, dashBoardMenu } from "../../../../HomeData.json";
import { useCurrentUser } from "../../../Context/UserContext";
import PageBanner from "../../../utils/PageBanner";
import Screen from "../../../utils/Screen";

const ProfileMenu = () => {
  const [responsiveMenu, setResponsiveMenu] = useState(false);
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === "ADMIN";

  const { pathname } = useLocation();
  const splitPath = pathname.split("/");
  const pathName = `${splitPath[1]}/${splitPath[2]}`;

  return (
    <>
      <PageBanner title="Profile" />
      <Screen>
        <div className="flex flex-col md:flex-row gap-3 my-10 border-2 border-gray-700/20 rounded-lg shadow-md">
          <div className="flex-[1] space-y-3">
            <UserMenu
              memberTitle="Member"
              setResponsiveMenu={setResponsiveMenu}
            />
            <div
              className={`py-3 border-b md:border-none md:block transition-all duration-500 !h-fit
            ${classNames({ "hidden opacity-100": !responsiveMenu })}`}
            >
              {isAdmin &&
                dashBoardMenu.map((btn) => (
                  <Link
                    to={`${btn.path}/${currentUser?.id}`}
                    key={btn.title}
                    className={`block text-left capitalize py-2 text-sm hover:text-blue-600 p-3
                ${classNames({
                  "bg-blue-100/50 text-blue-600 border-l-2 border-blue-600":
                    btn.path.includes(pathName),
                })}
                
                `}
                  >
                    {btn.title === "Profile" ? "My Profile" : btn.title}
                  </Link>
                ))}
              {dropMenu.map((btn) => (
                <Link
                  to={`${btn.path}/${currentUser?.id}`}
                  key={btn.title}
                  className={`block text-left capitalize py-2 text-sm hover:text-blue-600 p-3
                ${classNames({
                  "bg-blue-100/50 text-blue-600 border-l-2 border-blue-600":
                    btn.path.includes(pathName),
                })}
                
                `}
                >
                  {btn.title === "Profile" ? "My Profile" : btn.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-[2.5] h-fit">
            <Outlet />
          </div>
        </div>
      </Screen>
    </>
  );
};

export default ProfileMenu;
