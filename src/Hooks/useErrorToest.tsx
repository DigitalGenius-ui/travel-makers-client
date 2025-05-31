import { useEffect } from "react";
import { toast } from "react-toastify";

const useErrorToest = ({ error, isError }) => {
  const message = error?.response?.data?.message;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);
};

export default useErrorToest;
