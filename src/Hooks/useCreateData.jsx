import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateData = ({ key, func }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: func,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  const submitForm = async ({ inputData, dataMessage }) => {
    try {
      const { data } = await mutateAsync(inputData);
      dataMessage &&
        toast({
          title: data.status === "SUCCESS" ? dataMessage : data.message,
          status: data.status === "SUCCESS" ? "success" : "error",
          duration: 3000,
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw new Error(error.message);
    }
  };

  return { submitForm, isPending };
};

export default useCreateData;
