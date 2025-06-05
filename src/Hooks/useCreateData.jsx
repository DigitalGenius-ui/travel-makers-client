import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useErrorToest from "./useErrorToest";

const useCreateData = ({ key, func }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: func,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  const submitForm = async ({ inputData, dataMessage }) => {
    const newData = inputData
      ? await mutateAsync(inputData)
      : await mutateAsync();

    // toast notification
    dataMessage &&
      toast({
        title: dataMessage,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    return newData;
  };

  useErrorToest({ isError, error });

  return { submitForm, isPending };
};

export default useCreateData;
