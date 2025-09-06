import CardWrapper from "./CartWrapper";
import Inputs from "./Inputs";
import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { AUTH_KEY } from "../../constants/react-query";
import { passwordValidation } from "./Schemas";
import { resetPassword } from "../../api-call/auth-api";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCreateData from "../../hooks/useCreateData";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const exp = searchParams.get("exp");

  const now = Date.now();

  const validLink = code && exp && +exp > now;

  const { submitForm, isPending } = useCreateData({
    key: AUTH_KEY,
    func: resetPassword,
  });

  const handleSubmit = async (values: { password: string; code?: number }) => {
    await submitForm({
      inputData: {
        password: values.password,
        code: code,
      },
      dataMessage: "Password has been reseted successfully!",
    });

    navigate("/auth/login", { replace: true });
  };

  const formikConfigs = {
    initialValues: {
      password: "milad1234",
    },
    validationSchema: passwordValidation,
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfigs);
  return (
    <CardWrapper
      headText={validLink ? "Enter youe New Password" : ""}
      footLink="/auth/login"
      footText="Go to login page"
      isGoBack={false}
    >
      {validLink ? (
        <form onSubmit={formik.handleSubmit} className="space-y-4 pb-4">
          <Inputs
            name="password"
            formik={formik}
            label="Password"
            type="password"
          />
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
      ) : (
        <h1 className="text-center text-rose-700">
          Your session is expired, please request for an other code
        </h1>
      )}
    </CardWrapper>
  );
};

export default ResetPassword;
