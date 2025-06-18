import { HStack } from "@chakra-ui/react";
import clsx from "clsx";

const Bookings = ({ book, isTicketExpired }) => {
  if (!book) return;

  const {
    tourImage,
    title,
    firstName,
    lastName,
    tickets,
    travelDate,
    ticketVerified,
    verifyNumber,
    totalPrice,
  } = book;

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
        <h2 className="text-xl font-bold text-black/70">{travelDate}</h2>
        <HStack>
          <span
            className={clsx(
              `w-[0.9rem] h-[0.9rem] rounded-full inline-block`,
              isTicketExpired && !ticketVerified
                ? "bg-gray-500"
                : !ticketVerified
                ? "bg-yellow-500"
                : "bg-green-500"
            )}
          />
          <h2 className="text-sm">
            {isTicketExpired && !ticketVerified
              ? "Ticket is Expired"
              : ticketVerified
              ? "Verified"
              : "Not verified yet"}
          </h2>
        </HStack>
      </div>
    </div>
  );
};

export default Bookings;

const UserDetail = ({ title, detail }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <h3 className="font-medium text-black/70">{title} :</h3>
      <p className="font-medium text-black/70">{detail}</p>
    </div>
  );
};
