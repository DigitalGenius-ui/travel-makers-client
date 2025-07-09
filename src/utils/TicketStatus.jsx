import React from "react";
import { parsDateHandler } from "./Date";
import { isAfter } from "date-fns";
import clsx from "clsx";

const colors = {
  pending: "bg-yellow-200 text-yellow-700 border-yellow-300",
  verified: "bg-green-200 text-green-600 border-green-300",
  canceled: "bg-rose-200 text-rose-500 border-rose-300",
};

const TicketStatus = ({ status, travelDate }) => {
  const { parsDate } = parsDateHandler(travelDate);
  const isTicketExpired = isAfter(new Date(), parsDate);

  return (
    <p
      className={clsx(
        "font-bold p-1 px-2 rounded-md uppercase w-fit text-xs border",
        colors[status],
        isTicketExpired && "bg-gray-500"
      )}
    >
      {status}
    </p>
  );
};

export default TicketStatus;
