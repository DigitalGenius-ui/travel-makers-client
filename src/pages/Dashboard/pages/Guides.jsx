import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import CustomeMenu from "../../../utils/CustomeMenu";
import { ActionButton } from "../../../utils/ActionButton";
import { AddIcon } from "@chakra-ui/icons";
import { tourGuids } from "../../../constants/TourGuids";
import { gender } from "../../../constants/assets";
import { BiSolidMessageAltDots } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { SlChart } from "react-icons/sl";
import { RiFileUserLine } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import { format } from "date-fns";
import clsx from "clsx";

const Guides = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeGuide, setActiveGuide] = useState(tourGuids[0]);

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

  function profileDetails() {
    const {
      userImg,
      gender: userGender,
      fullName,
      role,
      yearsOfEx,
      expLevel,
      jobType,
      jobStatus,
      bannerImg,
      skills,
      experiences,
    } = activeGuide;

    const profileImg = !userImg ? gender[userGender] : userImg;
    return (
      <>
        {/* banner and user profile img  */}
        <div className="relative">
          <div
            className="w-full h-[25vh] overflow-hidden"
            style={{
              backgroundImage:
                bannerImg ||
                "url(https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <figure
            className="size-[4.5rem] border-2 border-white rounded-xl 
            overflow-hidden absolute -bottom-8 left-6"
          >
            <img className="size-full" src={profileImg} alt="user profile" />
          </figure>
        </div>
        {/* user data  */}
        <article className="mt-[3rem] mb-[2rem] w-[90%] mx-auto space-y-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">{fullName}</h2>
              <p className="text-xs capitalize text-gray-600">{role}</p>
            </div>
            <div className="space-x-2">
              <ActionButton px="0.8rem" py="1.3rem" colorScheme="gray">
                <BiSolidMessageAltDots size={20} />
              </ActionButton>
              <ActionButton px="0.8rem" py="1.3rem">
                <IoCallOutline size={20} />
              </ActionButton>
            </div>
          </div>
          {/* work history boxes  */}
          <div className="box bg-gray-100 rounded-lg p-3">
            <UserWorkHistory
              title="work experince"
              value={yearsOfEx}
              icon={MdWorkOutline}
            />
            <UserWorkHistory
              title="experince level"
              value={expLevel}
              icon={SlChart}
            />
            <UserWorkHistory
              title="job type"
              value={jobType}
              icon={RiFileUserLine}
            />
            <UserWorkHistory
              title="job status"
              value={jobStatus}
              icon={FaUserCheck}
            />
          </div>
          {/* skills  */}
          <div>
            <h2 className="font-semibold pb-3">Skills</h2>
            <ul className="space-y-1">
              {skills.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="text-btnBlue">
                    <IoCheckmarkCircle />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* experiences  */}
          <div>
            <h2 className="font-semibold pb-3">Experiences</h2>
            <ul className="space-y-5">
              {experiences.map((item) => (
                <WorkExperience item={item} key={item.id} />
              ))}
            </ul>
          </div>
        </article>
      </>
    );
  }
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-3 mb-[2rem]">
      {/* right part  */}
      <div className="flex-[1.3] bg-gray-100 rounded-md p-3">
        {filterBar()}
        <div className="flex flex-col gap-3 mt-3">
          {tourGuids.map((item) => (
            <Guide
              setActiveGuide={setActiveGuide}
              activeGuide={activeGuide}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
      {/* left part  */}
      <div className="flex-1 border border-gray-300 rounded-xl overflow-hidden">
        {profileDetails()}
      </div>
    </section>
  );
};

export default Guides;

const UserWorkHistory = ({ title, value, icon }) => {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3 capitalize">
      <span className="size-10 bg-white grid place-items-center rounded-md text-btnBlue">
        {<Icon size={19} />}
      </span>
      <div>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
        <h1 className="font-semibold">{value}</h1>
      </div>
    </div>
  );
};

const WorkExperience = ({ item }) => {
  const { tourType, expLevel, startDate, finishDate, details } = item;

  const finishedDate = finishDate ? format(finishDate, "LLL yyyy") : "present";
  return (
    <li className="flex gap-5">
      <div className="flex-1">
        <span className="size-14 bg-gray-100 flex items-center justify-center rounded-full text-btnBlue">
          <MdWorkOutline size={20} />
        </span>
      </div>
      <div className="capitalize space-y-1">
        <h2 className="font-semibold">{expLevel} tour guide</h2>
        <p className="text-xs text-gray-600">
          {`${tourType} • ${format(startDate, "LLL yyyy")} - ${finishedDate}`}
        </p>
        <p className="text-sm pt-2">{details}</p>
      </div>
    </li>
  );
};

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
          <div className="flex gap-8 text-sm text-gray-600 space-y-1">
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
          `bg-blue-100 capitalize px-2 py-1 rounded-md text-sm text-gray-600
       group-hover:bg-white pointer-events-none`,
          activeGuide.id === id && "bg-white"
        )}
      >
        {role}
      </p>
    </div>
  );
};
