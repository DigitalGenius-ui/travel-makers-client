import clsx from "clsx";
import { SlCalender } from "react-icons/sl";
import { PiUserCircleCheck } from "react-icons/pi";
import { TfiMoney } from "react-icons/tfi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { Activity, useState, type ReactElement } from "react";
import CustomeMenu from "../../../utils/CustomeMenu";
import { useQuery } from "@tanstack/react-query";
import { getInsight } from "../../../api-call/dashboard-api";
import { ChartLoading } from "../../../utils/Loadings";
import useErrorToest from "../../../hooks/useErrorToest";
import { DASH_INSIGHT } from "../../../constants/react-query";

const filterMenus = ["weekly", "monthly", "yearly"];

const Insight = ({ isBooking }: { isBooking?: boolean }) => {
  const [filter, setFilter] = useState<string>("weekly");

  const { data, isPending, error, isError } = useQuery({
    queryKey: [DASH_INSIGHT, filter],
    queryFn: async () => await getInsight(filter),
  });

  useErrorToest({ error, isError });

  return (
    <>
      <div className="flex items-center gap-3 justify-end">
        <p>Filter based on :</p>
        <CustomeMenu menus={filterMenus} value={filter} setValue={setFilter} />
      </div>
      {isPending ? (
        <div className="box">
          {Array.from({ length: 3 }).map((_, i) => (
            <ChartLoading key={i} isBooking={isBooking} h={40} />
          ))}
        </div>
      ) : (
        <div className="box">
          <InsightCard
            title={"Total Booking"}
            amount={data?.bookings?.totalBookings}
            estimate={data?.bookings?.percent}
            icon={<SlCalender size={21} />}
            isBooking={isBooking}
            data={data?.bookings?.bookingsTime}
            filter={filter}
          />
          <InsightCard
            title={"Total new customers"}
            amount={data?.customers?.totalCustomer}
            estimate={data?.customers.percent}
            icon={<PiUserCircleCheck size={25} />}
            isBooking={isBooking}
            data={data?.customers?.customerTime}
            filter={filter}
          />
          <InsightCard
            title={"Total earnings"}
            amount={data?.earnings.totalEarnings}
            estimate={data?.earnings.percent}
            icon={<TfiMoney size={22} />}
            isBooking={isBooking}
            data={data?.earnings.earningsTime}
            filter={filter}
          />
        </div>
      )}
    </>
  );
};

export default Insight;

type InsightProps = {
  title: string;
  amount: number | undefined;
  estimate: number | undefined;
  icon: ReactElement;
  isBooking: boolean | undefined;
  filter: string;
  data:
    | {
        name: string;
        value: number;
      }[]
    | undefined;
};

const InsightCard = ({
  title,
  amount = 0,
  estimate = 0,
  icon,
  isBooking,
  data,
  filter,
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
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const item = payload[0];
              return (
                <div className="bg-white px-2">
                  <div
                    key={item.value}
                    className="flex flex-col justify-center items-center"
                  >
                    <p>{item.value}</p>
                    <p>{item.payload.name}</p>
                  </div>
                </div>
              );
            }}
          />
          <XAxis dataKey="name" hide />
          <Area
            connectNulls
            type="monotone"
            dataKey="value"
            stroke="#0d6efd"
            fill="#0d6efd"
            fillOpacity={0.4}
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const isEarning = title === "Total earnings";
  const newFilterText = filter.slice(0, -2);

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
            <p className="text-xl font-bold">
              {isEarning ? `${amount?.toFixed(2)}$` : amount}
            </p>
          </div>
          <p
            className={clsx(
              "bg-white rounded-md text-sm px-1 flex items-center justify-center gap-1 w-fit"
            )}
          >
            <span
              className={clsx(
                "text-blue-400 flex items-center gap-1",
                estimate <= 0 && "text-rose-700"
              )}
            >
              {estimate <= 0 ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
              {estimate}%
            </span>
            <Activity mode={isBooking ? "hidden" : "visible"}>
              <span className="text-darkText">from last {newFilterText}</span>
            </Activity>
          </p>
        </div>
      </div>
      <Activity mode={isBooking ? "hidden" : "visible"}>{chart()}</Activity>
    </div>
  );
};
