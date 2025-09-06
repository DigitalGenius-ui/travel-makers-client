import { InfoOutlineIcon } from "@chakra-ui/icons";
import type { ReactNode } from "react";

const ErrorLabel = ({ message }: { message: ReactNode }) => {
  return (
    <div className="grid place-items-center">
      <div
        className="bg-rose-200 border border-rose-300 p-3 w-fit  
      rounded-md flex items-center gap-2 !text-rose-600 !mb-4"
      >
        <InfoOutlineIcon className="!text-rose-600" />
        {message}
      </div>
    </div>
  );
};

export default ErrorLabel;
