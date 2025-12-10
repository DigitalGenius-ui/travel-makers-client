import { BsExclamationTriangle } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const errorClass =
  "flex items-center gap-2 text-sm bg-rose-100 text-rose-500 p-3 rounded-md";
const successClass =
  "flex items-center gap-2 text-sm bg-emerald-100 text-emerald-500 p-3 rounded-md";

const FormMessage = ({
  messageText,
  type,
}: {
  messageText: string;
  type: "error";
}) => {
  if (!messageText || !type) return;
  const isError = messageText && type === "error";
  return (
    <>
      <div className={isError ? errorClass : successClass}>
        {isError ? (
          <BsExclamationTriangle className="text-lg" />
        ) : (
          <IoIosCheckmarkCircleOutline className="text-lg" />
        )}
        <p>{messageText}</p>
      </div>
    </>
  );
};

export default FormMessage;
