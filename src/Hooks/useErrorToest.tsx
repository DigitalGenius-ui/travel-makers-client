import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const useErrorToest = ({ error, isError }) => {
  const message = error?.response?.data?.message || error?.message;
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }, [isError]);
};

export default useErrorToest;
