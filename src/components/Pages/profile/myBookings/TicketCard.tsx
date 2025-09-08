import { HStack } from "@chakra-ui/react";
import { TicketStatus } from "../../../../utils/StatusBox";
import { format } from "date-fns";
import type { ticketsType } from "../../../../types/tours-type";

const TicketCard = ({ bookedTicket }: { bookedTicket: ticketsType }) => {
  if (!bookedTicket) return;

  const {
    tourImage,
    title,
    firstName,
    lastName,
    tickets,
    travelDate,
    status,
    verifyNumber,
    totalPrice,
  } = bookedTicket;

  const formateDate = format(travelDate, "E, MMM dd, yy");

  return (
    <div
      className="border border-gray-200 rounded-md w-full tablet:h-[10rem] 
      overflow-hidden flex flex-col tablet:flex-row gap-2 bg-gray-100/80"
    >
      <img
        className="sm:h-[10rem] tablet:h-full tablet:w-[13rem] object-cover"
        src={tourImage}
        alt="tour-img"
      />
      <div className="p-3 tablet:py-3 tablet:flex-[1]">
        <h2 className="text-xl font-medium text-center tablet:text-left">
          {title}
        </h2>
        <div className="p-2">
          <UserDetail title="Full Name" detail={`${firstName} ${lastName}`} />
          <UserDetail title="Adult" detail={tickets?.adult} />
          <UserDetail title="Child" detail={tickets?.child} />
          <UserDetail title="Ticket Verify" detail={verifyNumber} />
          <UserDetail title="Total Price" detail={`$${totalPrice}`} />
        </div>
      </div>
      <div className="p-3 flex flex-col items-center tablet:justify-between">
        <h2 className="text-xl font-bold text-black/70">{formateDate}</h2>
        <HStack>
          <TicketStatus travelDate={travelDate} status={status} />
        </HStack>
      </div>
    </div>
  );
};

export default TicketCard;

const UserDetail = ({
  title,
  detail,
}: {
  title: string;
  detail: string | number;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <h3 className="font-medium text-black/70">{title} :</h3>
      <p className="font-medium text-black/70">{detail}</p>
    </div>
  );
};
