import clsx from "clsx";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { PiUserCircleCheck } from "react-icons/pi";
import { TfiMoney } from "react-icons/tfi";

const Insight = () => {
  return (
    <section className="box">
      <InsightCard
        title={"Total Booking"}
        amount={1000}
        estimate={2.4}
        icon={<SlCalender size={21} />}
      />
      <InsightCard
        title={"Total new customers"}
        amount={1000}
        estimate={2.4}
        icon={<PiUserCircleCheck size={25} />}
      />
      <InsightCard
        title={"Total earnings"}
        amount={1000}
        estimate={2.4}
        icon={<TfiMoney size={22} />}
      />
    </section>
  );
};

export default Insight;

const InsightCard = ({ title, amount, estimate, icon }) => {
  return (
    <div className="bg-blue-100 rounded-md p-3 flex items-center gap-3 relative">
      {/* icon  */}
      <span className="size-12 bg-white flex items-center justify-center rounded-md text-blue-500">
        {icon}
      </span>
      <div>
        <h3 className="text-gray-600 text-sm capitalize">{title}</h3>
        <p className="text-xl font-bold">{amount}</p>
      </div>
      <p
        className={clsx(
          "bg-white rounded-md absolute bottom-2 right-2 text-sm px-1 flex-items-center justify-center"
        )}
      >
        {estimate}%
      </p>
    </div>
  );
};
