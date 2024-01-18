import React from "react";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const Address = ({ tourDetails }) => {
  return (
    <div className="border-t border-gray-400 my-3 py-2 space-y-2">
      <TitleIcon
        icon={<IoTime />}
        title="Open"
        address={`Open on ${tourDetails?.open_time} Close on ${tourDetails?.close_time}`}
      />
      <TitleIcon
        icon={<IoLocationSharp />}
        title="Address"
        address={tourDetails?.address}
      />
      <TitleIcon
        icon={<MdLocalPhone />}
        title="Phone"
        address={tourDetails?.phone_number}
      />
    </div>
  );
};

export default Address;

const TitleIcon = ({ icon, title, address }) => {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm">
        <div className="flex gap-2">
          <span className="text-xl text-blue-900 ">{icon}</span>
          <a
            href="#map"
            className="block pl-8 text-sm text-gray-500 cursor-pointer
          hover:text-black/40">
            <span className="text-blue-900 font-bold">{title} : </span>
            {address}
          </a>
        </div>
      </div>
    </div>
  );
};
