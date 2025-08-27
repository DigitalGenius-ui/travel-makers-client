import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useErrorToest from "./useErrorToest";

const useCreateData = <TData, TVariable = void>({
  key,
  func,
}: {
  key: string;
  func: (tVariable: TVariable) => Promise<TData>;
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: func,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  const submitForm = async ({
    inputData,
    dataMessage,
  }: {
    inputData: TVariable;
    dataMessage: string;
  }) => {
    const newData = await mutateAsync(inputData);

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
