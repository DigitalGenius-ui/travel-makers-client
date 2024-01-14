import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const FormMessage = ({ messageText, type }) => {
  if (!messageText || !type) return;
  return (
    <>
      {type === "error" ? (
        <div className="flex items-center gap-2 text-sm bg-rose-100 text-rose-500 p-3 rounded-md">
          <BsExclamationTriangle className="text-lg" />
          <p>{messageText}</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm bg-emerald-100 text-emerald-500 p-3 rounded-md">
          <IoIosCheckmarkCircleOutline className="text-lg" />
          <p>{messageText}</p>
        </div>
      )}
    </>
  );
};

export default FormMessage;
