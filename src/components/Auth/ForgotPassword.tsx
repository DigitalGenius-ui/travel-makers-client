import CardWrapper from "./CartWrapper";
import Inputs from "./Inputs";
import { useFormik } from "formik";
import { AUTH_KEY } from "../../constants/react-query";
import { forgotPassword } from "../../api-call/auth-api";
import * as yup from "yup";
import { Button } from "@chakra-ui/react";
import useCreateData from "../../hooks/useCreateData";

const ForgotPassword = () => {
  const { submitForm, isPending } = useCreateData({
    key: AUTH_KEY,
    func: forgotPassword,
  });

  const handleSubmit = async ({ email }: { email: string }) => {
    await submitForm({
      inputData: { email: email },
      dataMessage: "Reset link is send to your email!",
    });
  };

  const formikConfigs = {
    initialValues: {
      email: "admin@gmail.com",
    },
    validationSchema: yup.string().email(),
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfigs);
  return (
    <CardWrapper
      headText="Enter youe Email Address"
      footLink="/auth/login"
      footText="Go back to login page"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4 pb-4">
        <Inputs name="email" formik={formik} label="Email" type="email" />
        <Button
          isLoading={isPending}
          type="submit"
          fontSize="sm"
          w="100%"
          variant="solid"
          colorScheme="blue"
          py="1.4rem"
        >
          Submit
        </Button>
      </form>
    </CardWrapper>
  );
};

export default ForgotPassword;
