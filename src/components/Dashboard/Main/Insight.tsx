import clsx from "clsx";
import { SlCalender } from "react-icons/sl";
import { PiUserCircleCheck } from "react-icons/pi";
import { TfiMoney } from "react-icons/tfi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { useState, type ReactElement } from "react";
import CustomeMenu from "../../../utils/CustomeMenu";

const filterMenus = ["weekly", "monthly", "yearly"];

const Insight = ({ isBooking }: { isBooking?: boolean }) => {
  const [filter, setFilter] = useState("weekly");
  const totalBookings = 1000;
  const newCustomer = 1000;
  const totalEarnings = 2000;

  return (
    <>
      <div className="flex items-center gap-3 justify-end">
        <p>Filter based on :</p>
        <CustomeMenu menus={filterMenus} value={filter} setValue={setFilter} />
      </div>
      <div className="box">
        <InsightCard
          title={"Total Booking"}
          amount={totalBookings}
          estimate={2.4}
          icon={<SlCalender size={21} />}
          isBooking={isBooking}
        />
        <InsightCard
          title={"Total new customers"}
          amount={newCustomer}
          estimate={2.4}
          icon={<PiUserCircleCheck size={25} />}
          isBooking={isBooking}
        />
        <InsightCard
          title={"Total earnings"}
          amount={totalEarnings}
          estimate={2.4}
          icon={<TfiMoney size={22} />}
          isBooking={isBooking}
        />
      </div>
    </>
  );
};

export default Insight;

const customeTooltip = ({ active, payload, label }) => {
  console.log(label);
  return <></>;
};

type InsightProps = {
  title: string;
  amount: number;
  estimate: number;
  icon: ReactElement;
  isBooking: boolean | undefined;
  data: {
    name: string;
    total: number;
  };
};

const InsightCard = ({
  title,
  amount,
  estimate,
  icon,
  isBooking,
  data,
}: InsightProps) => {
  const chart = () => (
    <div
      className="flex-1"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width="100%" height={50}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Tooltip content={customeTooltip} />
          <XAxis dataKey="name" hide />
          <Area
            connectNulls
            type="monotone"
            dataKey="uv"
            stroke="#0d6efd"
            fill="#0d6efd"
            fillOpacity={0.4}
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
  return (
    <div
      className={clsx(
        "bg-blue-100 rounded-md p-3 relative flex flex-col tablet:items-end tablet:flex-row",
        !isBooking && "items-start md:items-end"
      )}
    >
      {/* icon  */}
      <div
        className={clsx(
          `flex-1 flex flex-row gap-3`,
          isBooking && "flex-col justify-between"
        )}
      >
        <span className="size-12 bg-white flex items-center justify-center rounded-md text-blue-500">
          {icon}
        </span>
        <div
          className={clsx(
            `w-full space-y-2`,
            !isBooking && "flex items-end justify-between"
          )}
        >
          <div className="w-full">
            <h3 className="text-darktext text-sm capitalize">{title}</h3>
            <p className="text-xl font-bold">{amount}</p>
          </div>
          <p
            className={clsx(
              "bg-white rounded-md text-sm px-1 flex items-center justify-center gap-1 w-fit"
            )}
          >
            <span className="text-blue-400 flex items-center gap-1">
              <FaArrowTrendUp />
              {estimate}%
            </span>
            {isBooking && <span className="text-darkText">from last week</span>}
          </p>
        </div>
      </div>
      {isBooking && chart()}
    </div>
  );
};
