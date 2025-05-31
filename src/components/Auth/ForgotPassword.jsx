import CardWrapper from "./CartWrapper";
import Inputs from "./Inputs";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AUTH_KEY } from "../../constants/react-query";
import { forgotPassword } from "../../api-call/auth-api";
import useErrorToest from "../../Hooks/useErrorToest";
import * as yup from "yup";
import { Button } from "@chakra-ui/react";

const ForgotPassword = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: [AUTH_KEY],
    mutationFn: forgotPassword,
  });

  const handleSubmit = async (values) => {
    await mutateAsync({
      email: values.email,
    });

    if (!isError) {
      toast.success("Reset link is send to your email!");
    }
  };

  useErrorToest({ error, isError });

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
