import CardWrapper from "./Auth/CartWrapper";
import { Button } from "@chakra-ui/react";
import { AUTH_KEY } from "../constants/react-query";
import { verifyEmail } from "../api-call/auth-api";
import { useNavigate, useParams } from "react-router-dom";
import useCreateData from "../hooks/useCreateData";

const EmailVerify = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { submitForm, isPending } = useCreateData({
    key: AUTH_KEY,
    func: verifyEmail,
  });

  const handleSubmit = async () => {
    await submitForm({
      inputData: code,
      dataMessage: "Your email is verified successfully!",
    });
    navigate("/auth/login", { replace: true });
  };

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
