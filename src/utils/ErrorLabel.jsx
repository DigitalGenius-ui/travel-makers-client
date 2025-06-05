import { InfoOutlineIcon, WarningIcon } from "@chakra-ui/icons";

const ErrorLabel = ({ message }) => {
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
