import clsx from "clsx";
import { BiSolidMessageAltDots } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { gender } from "../../../constants/assets";

const Guide = ({ item, setActiveGuide, activeGuide }) => {
  const { fullName, email, phoneNumber, userImg, role, id } = item;
  const userGender = item.gender;
  const profileImg = !userImg ? gender[userGender] : userImg;
  return (
    <div
      onClick={() => setActiveGuide(item)}
      className={clsx(
        `flex items-center gap-2 justify-between bg-white rounded-md 
        p-2 hover:bg-blue-100 group cursor-pointer transition-all duration-300`,
        activeGuide.id === id && "!bg-blue-100"
      )}
    >
      <div className="flex-1 flex gap-4 pointer-events-none">
        <div className="size-12">
          <img
            className="size-full object-cover rounded-md"
            src={profileImg}
            alt="user-profile"
          />
        </div>
        <div className="">
          <h1 className="font-semibold">{fullName}</h1>
          <div className="flex gap-8 text-sm text-darkText space-y-1">
            <p className="flex items-center gap-1 text-xs">
              <BiSolidMessageAltDots size={13} />
              {email}
            </p>
            <p className="flex items-center gap-1 text-xs">
              <IoCallOutline size={13} />
              {phoneNumber}
            </p>
          </div>
        </div>
      </div>
      <p
        className={clsx(
          `bg-blue-100 capitalize px-2 py-1 rounded-md text-sm text-darkText
       group-hover:bg-white pointer-events-none`,
          activeGuide.id === id && "bg-white"
        )}
      >
        {role}
      </p>
    </div>
  );
};

export default Guide;
