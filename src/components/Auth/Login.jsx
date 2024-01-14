import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import Inputs from "./Inputs";
import CardWrapper from "./CartWrapper";
import FormMessage from "./FormMessage";
import { loginSchema } from "./Schemas";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../FetchData/User/Auth";
import ErrorApi from "../../utils/ErrorApi";

const SignIn = () => {
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: loginUser,
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

    if (userData?.data.status === "ERROR") {
      setMessage((prev) => ({ ...prev, error: userData?.data?.message }));
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData?.data?.user));
    // window.location.reload();
  };

  const formikConfigs = {
    initialValues: {
      email: "admin@gmail.com",
      password: "Admin@321",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfigs);
  return (
    <CardWrapper
      headText="Welcome Back"
      footLink="/auth/register"
      footText="Don't have an account?">
      <form onSubmit={formik.handleSubmit} className="space-y-4 pb-4">
        <Inputs name="email" formik={formik} label="Email" type="email" />
        <Inputs
          name="password"
          formik={formik}
          label="Password"
          type="password"
        />
        <FormMessage type="error" messageText={message.error} />
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

export default SignIn;
