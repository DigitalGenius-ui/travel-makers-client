import { parsDateHandler } from "./Date";
import { isAfter } from "date-fns";
import clsx from "clsx";

type statusColorType = "pending" | "verified" | "canceled";
const colors: Record<statusColorType, string> = {
  pending: "bg-yellow-200 text-yellow-700 border-yellow-300",
  verified: "bg-green-200 text-green-600 border-green-300",
  canceled: "bg-rose-200 text-rose-500 border-rose-300",
};

export const TicketStatus = ({
  status,
  travelDate,
}: {
  status: statusColorType;
  travelDate: Date;
}) => {
  const { parsDate } = parsDateHandler(travelDate);
  const isTicketExpired =
    isAfter(new Date(), parsDate) && status !== "verified";

  return (
    <p
      className={clsx(
        "font-bold p-1 px-2 rounded-md uppercase w-fit text-xs border",
        isTicketExpired ? "bg-gray-500 text-gray-200" : colors[status]
      )}
    >
      {isTicketExpired ? "expired" : status}
    </p>
  );
};

const userStatusColor: Record<"VERIFIED" | "UNVERIFIED" | "BLOCKED", string> = {
  VERIFIED: "bg-green-200 text-green-600 border-green-300",
  UNVERIFIED: "bg-gray-500 text-gray-200",
  BLOCKED: "bg-rose-200 text-rose-500 border-rose-300",
};

type statusType = "VERIFIED" | "UNVERIFIED" | "BLOCKED";

export const UserStatus = ({ status }: { status: statusType }) => {
  return (
    <p
      className={clsx(
        "font-bold p-1 px-2 rounded-md uppercase w-fit text-xs border",
        userStatusColor[status]
      )}
    >
      {status}
    </p>
  );
};
