import React, { useState } from "react";
import WhiteBg from "../../../utils/WhiteBg";
import UserMenu from "./UserMenu";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Profile from "./myProfile/Profile";
import classNames from "classnames";
import { dropMenu } from "../../../../HomeData.json";
import useCurrentUser from "../../../Hooks/useCurrentUser";
// import MyPosts from "./myPosts/MyPosts";
import MyBookings from "./myBookings/MyBookings";

const ProfileMenu = () => {
  const [responsiveMenu, setResponsiveMenu] = useState(false);
  const currentUser = useCurrentUser();

  const path = useParams();
  const pathName = path["*"].split("/")[0];

  return (
    <WhiteBg>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-[1] space-y-3 shadow-md">
          <UserMenu
            memberTitle="Member"
            setResponsiveMenu={setResponsiveMenu}
          />
          <div
            className={`py-3 border-b md:border-none md:block transition-all duration-500 !h-fit
            ${classNames({ "hidden opacity-100": !responsiveMenu })}`}>
            {dropMenu.map((btn) => (
              <Link
                to={`${btn.path}/${currentUser.id}`}
                key={btn.title}
                className={`block text-left capitalize py-2 text-sm hover:text-blue-600 p-3
                ${classNames({
                  "bg-blue-100/50 text-blue-600 border-l-2 border-blue-600":
                    btn.path.includes(pathName),
                })}
                
                `}>
                {btn.title === "Profile" ? "My Profile" : btn.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-[2.5] h-fit">
          <Routes>
            <Route path="/profileDetails/:id" element={<Profile />} />
            <Route path="/booking/:id" element={<MyBookings />} />
            {/* <Route path="/posts/:id" element={<MyPosts />} /> */}
          </Routes>
        </div>
      </div>
    </WhiteBg>
  );
};

export default ProfileMenu;
