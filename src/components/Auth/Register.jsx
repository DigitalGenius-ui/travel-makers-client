import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import CardWrapper from "./CartWrapper";
import Inputs from "./Inputs";
import FormMessage from "./FormMessage";
import { registerSchema } from "./Schemas";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../FetchData/User/Auth";
import ErrorApi from "../../utils/ErrorApi";

const Register = () => {
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: createUser,
  });

  if (isError) {
    return <ErrorApi errorText={error.message} />;
  }

  const handleSubmit = async (values) => {
    setMessage({
      error: "",
      success: "",
    });

    const userData = await mutateAsync({
      email: values.email,
      password: values.password,
    });

    const data = userData?.data;

    if (data.status === "ERROR") {
      setMessage((prev) => ({ ...prev, error: data.message }));
      return;
    }

    setMessage((prev) => ({ ...prev, success: data.message }));
  };

  const formikConfigs = {
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfigs);

  return (
    <CardWrapper
      headText="Register"
      footLink="/auth/login"
      footText="Already have an account?">
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
          name="rePassword"
          label="Re-Password"
          type="password"
        />
        <FormMessage type="error" messageText={message.error} />
        <FormMessage type="success" messageText={message.success} />
        <Button
          isLoading={isPending}
          type="submit"
          fontSize="sm"
          w="100%"
          variant="solid"
          colorScheme="blue"
          py="1.4rem">
          Submit
        </Button>
      </form>
    </CardWrapper>
  );
};

export default Register;
