import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import CardWrapper from "./CartWrapper";
import Inputs from "./Inputs";
import { registerSchema } from "./Schemas";
import { createUser, type registerType } from "../../api-call/auth-api";
import { USER_KEY } from "../../constants/react-query";
import { useNavigate } from "react-router-dom";
import useCreateData from "../../hooks/useCreateData";

const Register = () => {
  const navigate = useNavigate();

  const { submitForm, isPending } = useCreateData({
    key: USER_KEY,
    func: createUser,
  });

  const handleSubmit = async (values: registerType) => {
    await submitForm({
      inputData: values,
      dataMessage: "Verify code has been sent to you email!",
    });
    navigate("/auth/login");
  };

  const formikConfigs = {
    initialValues: {
      email: "admin@gmail.com",
      password: "Admin@321",
      confirmPassword: "Admin@321",
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfigs);

  return (
    <CardWrapper
      headText="Register"
      footLink="/auth/login"
      footText="Already have an account?"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4 pb-4">
        <Inputs formik={formik} name="email" label="Email" type="email" />
        <Inputs
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Inputs
          formik={formik}
          name="confirmPassword"
          label="Re-Password"
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
    </CardWrapper>
  );
};

export default Register;
