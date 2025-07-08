import React from "react";
import { useCurrentUser } from "../../Context/UserContext";
import { useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";

const LayoutHeader = () => {
  const { currentUser } = useCurrentUser();
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const profile = currentUser?.profile;

  const userGender = profile?.gender;
  const username = `${profile?.firstName} ${profile?.lastName}`;
  const role = currentUser?.role;

  const profileImg =
    !currentUser?.userImg && userGender === "male"
      ? "/male.png"
      : !currentUser?.userImg && userGender === "female"
      ? "/female.png"
      : currentUser?.userImg;
  return (
    <div className="py-5 flex items-center justify-between">
      <h1 className="capitalize font-bold text-gray-700">{path}</h1>
      <div className="flex items-center gap-5">
        {/* search input  */}
        <div className="flex items-center gap-2 bg-gray-100 p-[10px] rounded-md">
          <IoSearchOutline size={20} />
          <input
            className="outline-none bg-transparent text-sm"
            type="text"
            placeholder="search..."
          />
        </div>
        {/* notification  */}
        <div className="relative bg-gray-100 size-10 rounded-md flex items-center justify-center">
          <button>
            <IoIosNotificationsOutline size={30} />
          </button>
          <p
            className="bg-blue-500 size-5 text-xs text-white rounded-full 
            flex items-center justify-center absolute -top-1 -right-1"
          >
            99
          </p>
        </div>
        {/* user profile  */}
        <div className="flex gap-2">
          <img
            className="size-12 object-cover rounded-md"
            src={profileImg}
            alt="user-profile"
          />
          <div>
            <h2 className="font-semibold text-gray-700">{username}</h2>
            <p className="capitalize text-xs text-gray-500">
              {role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
