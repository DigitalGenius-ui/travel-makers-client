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
import { useQuery } from "@tanstack/react-query";
import { DASH_REVENEUE_DIS } from "../../../constants/react-query";
import { getRevenueAndTopDis } from "../../../api-call/dashboard-api";
import useErrorToest from "../../../hooks/useErrorToest";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const menus = ["weekly", "monthly", "yearly"];

const data2 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const Charts = () => {
  const [disFilter, setDisFilter] = useState("weekly");
  const [revenueFilter, setRevenueFilter] = useState("weekly");

  const { data, isPending, error, isError } = useQuery({
    queryKey: [DASH_REVENEUE_DIS, disFilter, revenueFilter],
    queryFn: async () => await getRevenueAndTopDis(disFilter, revenueFilter),
  });

  useErrorToest({ error, isError });

  function revenue() {
    return (
      <div className="flex-[1.2] dash-box">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Revenue Overview</h1>
          <CustomeMenu
            value={revenueFilter}
            setValue={setRevenueFilter}
            menus={menus}
          />
        </div>
        <div className="!w-full !h-64 focus:outline-none text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data?.revenue?.earningsTime}
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
                dataKey="value"
                stroke="#0d6efd"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <XAxis dataKey="name" stroke="0" />
              <YAxis
                width="auto"
                label={{ position: "insideLeft", angle: -90 }}
                stroke="0"
                dataKey={"value"}
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
                        {point.payload.name}
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
            value={disFilter}
            setValue={setDisFilter}
            menus={menus}
          />
        </div>
        <div className="flex flex-col xs:flex-row gap-3 items-center">
          <div className="flex-1 w-full h-64 flex items-center justify-center">
            <PieChart width={120} height={120}>
              <Pie
                data={data?.distinations}
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                dataKey="count"
              >
                {data2.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex-1 space-y-2">
            {data?.distinations.map((item, i) => (
              <DistinatoinBox
                key={i}
                index={i}
                title={item.title}
                participents={item.count}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col md:flex-row gap-4 w-full">
      {isPending ? (
        <>
          <p className="w-full h-72 bg-gray-200 animate-pulse rounded-md" />
          <p className="w-full h-72 bg-gray-200 animate-pulse rounded-md" />
        </>
      ) : (
        <>
          {/* revenue overview  */}
          {revenue()}
          {/* top distinations  */}
          {topDistinations()}
        </>
      )}
    </section>
  );
};

export default Charts;

const DistinatoinBox = ({
  title,
  participents,
  index,
}: {
  title: string;
  participents: number;
  index: number;
}) => {
  return (
    <div className="flex gap-2">
      <ColorBox
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
        className={`mt-2`}
      />
      <div>
        <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-700">{participents} participents</p>
      </div>
    </div>
  );
};
