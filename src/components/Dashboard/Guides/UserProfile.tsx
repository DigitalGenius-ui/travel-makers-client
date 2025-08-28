import { format } from "date-fns";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib";
import { MdWorkOutline } from "react-icons/md";

export const WorkExperience = ({ item }: { item: any }) => {
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
        <p className="text-xs text-darkText">
          {`${tourType} • ${format(startDate, "LLL yyyy")} - ${finishedDate}`}
        </p>
        <p className="text-sm pt-2">{details}</p>
      </div>
    </li>
  );
};

type worExpProps = {
  title: string;
  value: string;
  icon: IconType;
};
export const UserWorkHistory = ({ title, value, icon }: worExpProps) => {
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
