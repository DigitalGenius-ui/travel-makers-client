import clsx from "clsx";
import { SlCalender } from "react-icons/sl";
import { PiUserCircleCheck } from "react-icons/pi";
import { TfiMoney } from "react-icons/tfi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const Insight = ({ booking }) => {
  const totalBookings = 1000;
  const newCustomer = 1000;
  const totalEarnings = 2000;

  return (
    <section className="box">
      <InsightCard
        title={"Total Booking"}
        amount={totalBookings}
        estimate={2.4}
        icon={<SlCalender size={21} />}
        booking={booking}
      />
      <InsightCard
        title={"Total new customers"}
        amount={newCustomer}
        estimate={2.4}
        icon={<PiUserCircleCheck size={25} />}
        booking={booking}
      />
      <InsightCard
        title={"Total earnings"}
        amount={totalEarnings}
        estimate={2.4}
        icon={<TfiMoney size={22} />}
        booking={booking}
      />
    </section>
  );
};

export default Insight;

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const InsightCard = ({ title, amount, estimate, icon, booking }) => {
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
          <Tooltip />
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
        !booking && "items-start md:items-end"
      )}
    >
      {/* icon  */}
      <div
        className={clsx(
          `flex-1 flex flex-row gap-3`,
          booking && "flex-col justify-between"
        )}
      >
        <span className="size-12 bg-white flex items-center justify-center rounded-md text-blue-500">
          {icon}
        </span>
        <div
          className={clsx(
            `w-full space-y-2`,
            !booking && "flex items-end justify-between"
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
            {booking && <span className="text-darkText">from last week</span>}
          </p>
        </div>
      </div>
      {booking && chart()}
    </div>
  );
};
