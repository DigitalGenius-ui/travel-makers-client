import { format } from "date-fns";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ColorBox from "../../../utils/ColorBox";
import CustomeMenu from "../../../utils/CustomeMenu";
import { useState } from "react";

const data = [
  { days: "sun", tp: 400, date: "2025-02-07" },
  { days: "mon", tp: 400, date: "2025-03-07" },
  { days: "tue", tp: 200, date: "2025-04-07" },
  { days: "wed", tp: 500, date: "2025-02-07" },
  { days: "thu", tp: 400, date: "2025-05-07" },
  { days: "fri", tp: 800, date: "2025-06-07" },
  { days: "sat", tp: 300, date: "2025-08-07" },
];

const data2 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const menus = ["weekly", "monthly", "yearly"];

const Charts = () => {
  const [revenueData, setRevenueData] = useState("weekly");
  const [distinations, setDistinations] = useState("weekly");

  function revenue() {
    return (
      <div className="flex-[1.2] dash-box">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Revenue Overview</h1>
          <CustomeMenu
            value={revenueData}
            setValue={setRevenueData}
            menus={menus}
          />
        </div>
        <div className="!w-full !h-64 focus:outline-none text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="#aaa"
                strokeDasharray="1 1"
                vertical={false}
              />
              <Line
                type="monotone"
                dataKey="tp"
                stroke="#0d6efd"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <XAxis dataKey="days" stroke="0" />
              <YAxis
                width="auto"
                label={{ position: "insideLeft", angle: -90 }}
                stroke="0"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const point = payload[0];

                  return (
                    <div
                      className="bg-blue-100 text-center text-sm font-medium p-2 border 
                    border-gray-300 rounded shadow -translate-x-1/2 -translate-y-full"
                    >
                      ${point.value}
                      <div className="text-xs font-normal text-gray-500 mt-1">
                        {format(point.payload.date, "LLL dd, yyyy")}
                      </div>
                    </div>
                  );
                }}
                cursor={{
                  stroke: "#60A5FA",
                  strokeWidth: 2,
                  strokeDasharray: "4 4",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  function topDistinations() {
    return (
      <section className="flex-1 dash-box">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Top Destinations</h1>
          <CustomeMenu
            value={distinations}
            setValue={setDistinations}
            menus={menus}
          />
        </div>
        <div className="flex flex-col xs:flex-row gap-3 items-center">
          <div className="flex-1 w-full h-64 flex items-center justify-center">
            <PieChart width={120} height={120}>
              <Pie
                data={data2}
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex-1 space-y-2">
            <DistinatoinBox title="Tokyo Japan (35%)" participents={"2,400"} />
            <DistinatoinBox title="Tokyo Japan (35%)" participents={"2,400"} />
            <DistinatoinBox title="Tokyo Japan (35%)" participents={"2,400"} />
            <DistinatoinBox title="Tokyo Japan (35%)" participents={"2,400"} />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col md:flex-row gap-4 w-full">
      {/* revenue overview  */}
      {revenue()}
      {/* top distinations  */}
      {topDistinations()}
    </section>
  );
};

export default Charts;

const DistinatoinBox = ({
  title,
  participents,
}: {
  title: string;
  participents: string;
}) => {
  const color = "";
  return (
    <div className="flex gap-2">
      <ColorBox className="mt-2" />
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-700">{participents} participents</p>
      </div>
    </div>
  );
};
