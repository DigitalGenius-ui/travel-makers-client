import CardWrapper from "./Auth/CartWrapper";
import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AUTH_KEY } from "../constants/react-query";
import { verifyEmail } from "../api-call/auth-api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [AUTH_KEY],
    mutationFn: verifyEmail,
    onSuccess: () => {
      navigate("/auth/login", { replace: true });
    },
  });

  const handleSubmit = () => {
    mutate(code);

    if (!isError) {
      toast.success("Your email is verified successfully!");
    }
  };

  const errorMessage = error?.response?.data?.message;
  if (isError) {
    toast.error(errorMessage);
  }
  return (
    <CardWrapper headText={"Verify your account."}>
      <div className="w-full h-full flex items-center justify-center">
        <Button
          onClick={handleSubmit}
          isLoading={isPending}
          isDisabled={isPending}
          type="submit"
          fontSize="sm"
          w="100%"
          variant="solid"
          colorScheme="blue"
          py="1.4rem"
        >
          Click Here to verify your account!
        </Button>
      </div>
    </CardWrapper>
  );
};

export default EmailVerify;
