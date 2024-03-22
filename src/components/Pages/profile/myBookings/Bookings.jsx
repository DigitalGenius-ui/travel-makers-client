import { HStack } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";

const Bookings = ({ book }) => {
  return (
    <div
      className="border border-gray-200 rounded-md w-full tablet:h-[10rem] 
      overflow-hidden flex flex-col tablet:flex-row gap-2 bg-gray-100/80">
      <img
        className="sm:h-[10rem] tablet:h-full tablet:w-[13rem] object-cover"
        src={book?.tourImage}
        alt="tour-img"
      />
      <div className="p-3 tablet:py-3 tablet:flex-[1]">
        <h2 className="text-xl font-medium text-center tablet:text-left">
          {book?.title}
        </h2>
        <div className="p-2">
          <UserDetail
            title="Full Name"
            detail={`${book?.firstName} ${book?.lastName}`}
          />
          <UserDetail title="Adult" detail={book?.tickets?.adult} />
          <UserDetail title="Child" detail={book?.tickets?.child} />
          <UserDetail title="Ticket Verify" detail={book?.verifyNumber} />
          <UserDetail title="Total Price" detail={`$${book?.totalPrice}`} />
        </div>
      </div>
      <div className="p-3 flex flex-col items-center tablet:justify-between">
        <h2 className="text-xl font-bold text-black/70">{book?.travelDate}</h2>
        <HStack>
          {/* ${book?.ticketVerified ? "" : "bg-yellow-500"} */}
          <span
            className={`w-[0.9rem] h-[0.9rem] rounded-full bg-gray-500 inline-block
            ${classNames({ "bg-yellow-500": !book?.ticketVerified })}
            `}
          />
          <h2 className="text-sm">
            {book?.ticketVerified ? "Expired" : "Not verified yet"}
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
