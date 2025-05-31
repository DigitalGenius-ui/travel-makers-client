import { WarningIcon } from "@chakra-ui/icons";

const ErrorApi = ({ errorMessage, is }) => {
  return (
    <p className="flex items-center gap-2 text-rose-700 border bg-rose-100 rounded-md !p-2 mt-[1rem]">
      <span className="flex items-center justify-center">
        <WarningIcon />
      </span>
      <span>{errorMessage}</span>
    </p>
  );
};

export default ErrorApi;
