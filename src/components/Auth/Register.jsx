import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import CardWrapper from "./CartWrapper";
import Inputs from "./Inputs";
import { registerSchema } from "./Schemas";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../api-call/auth-api";
import { AUTH_KEY } from "../../constants/react-query";
import { toast } from "react-toastify";
import useErrorToest from "../../Hooks/useErrorToest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: [AUTH_KEY],
    mutationFn: createUser,
  });

  const handleSubmit = async (values) => {
    await mutateAsync(values);
    navigate("/auth/login");
    if (!isError) {
      toast.success("Verify code has been sent to you email!");
    }
  };

  useErrorToest({ error, isError });

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
