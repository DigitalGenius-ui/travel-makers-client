import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

type erroType = {
  error?: {
    response?: {
      data?: { message: string };
    };
    message?: string;
  } | null;
  isError: boolean;
};

const useErrorToest = ({ error, isError }: erroType) => {
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
  }, [isError, toast, message]);
};

export default useErrorToest;
