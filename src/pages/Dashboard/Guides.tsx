import { useState } from "react";
import CustomeMenu from "../../utils/CustomeMenu";
import { ActionButton } from "../../utils/ActionButton";
import { AddIcon } from "@chakra-ui/icons";
import { tourGuids } from "../../constants/tourGuide/tourGuids";
import { genderImg } from "../../constants/assets";
import { BiSolidMessageAltDots } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { SlChart } from "react-icons/sl";
import { RiFileUserLine } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import SearchInput from "../../utils/SearchInput";
import Guide from "../../components/Dashboard/Guides/Guide";
import {
  UserWorkHistory,
  WorkExperience,
} from "../../components/Dashboard/Guides/UserProfile";

const Guides = () => {
  const [search, setSearch] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeGuide, setActiveGuide] = useState(tourGuids[0]);

  function filterBar() {
    const menus = ["tour guide", "sydney guide"];
    return (
      <div className="flex items-center gap-2 justify-between">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name..."
            bg={"white"}
          />
        </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <CustomeMenu
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            menus={menus}
          />
          <ActionButton
            onClick={() => console.log("clicked!!!")}
            fontSize="sm"
            size="md"
            leftIcon={<AddIcon />}
          >
            Add Guide
          </ActionButton>
        </div>
      </div>
    );
  }

  function profileDetails() {
    const {
      userImg,
      gender,
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

    const userGender = gender as "male" | "female";

    const profileImg = !userImg ? genderImg[userGender] : userImg;
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
              <p className="text-xs capitalize text-darkText">{role}</p>
            </div>
            <div className="space-x-2">
              <ActionButton
                onClick={() => console.log("clicked")}
                px="0.8rem"
                py="1.3rem"
                colorScheme="gray"
              >
                <BiSolidMessageAltDots size={20} />
              </ActionButton>
              <ActionButton
                onClick={() => console.log("clicked")}
                px="0.8rem"
                py="1.3rem"
              >
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
                  className="flex items-center gap-2 text-darkText"
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
