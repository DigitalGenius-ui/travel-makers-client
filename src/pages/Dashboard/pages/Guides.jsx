import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import CustomeMenu from "../../../utils/CustomeMenu";
import { ActionButton } from "../../../utils/ActionButton";
import { AddIcon } from "@chakra-ui/icons";
import { tourGuids } from "../../../constants/TourGuids";
import { gender } from "../../../constants/assets";

const Guides = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  function filterBar() {
    const menus = ["tour guide", "sydney guide"];
    return (
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-1 bg-white px-2 rounded-md">
          <IoSearch size={19} className="text-gray-500 text-sm" />
          <input
            className="bg-transparent outline-none py-2"
            type="text"
            placeholder="Search By Name..."
          />
        </div>
        <div className="flex items-center gap-2">
          <CustomeMenu
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            menus={menus}
          />
          <ActionButton fontSize="sm" size="md" leftIcon={<AddIcon />}>
            Add Guide
          </ActionButton>
        </div>
      </div>
    );
  }
  return (
    <section className="flex gap-3">
      <div className="flex-[1.5] bg-gray-100 rounded-md p-3">
        {filterBar()}
        <div className="flex flex-col gap-3 mt-3">
          {tourGuids.map((item) => (
            <Guide item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex-1"></div>
    </section>
  );
};

export default Guides;

const Guide = ({ item }) => {
  const { fullName, email, phoneNumber, userImg, role } = item;
  const userGender = item.gender;
  const profileImg = !userImg ? gender[userGender] : userImg;
  return (
    <div className="flex items-center gap-2 justify-between bg-white rounded-md p-2">
      <div className="flex-1 flex gap-4">
        <div className="size-12 ">
          <img
            className="object-cover rounded-md"
            src={profileImg}
            alt="user-profile"
          />
        </div>
        <div className="">
          <h1 className="font-semibold">{fullName}</h1>
          <div className="flex gap-2 text-sm">
            <p>{email}</p>
            <p>{phoneNumber}</p>
          </div>
        </div>
      </div>
      <p className="bg-blue-100 capitalize px-2 py-1 rounded-md text-sm text-gray-600">
        {role}
      </p>
    </div>
  );
};
