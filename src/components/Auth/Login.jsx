import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import Inputs from "./Inputs";
import CardWrapper from "./CartWrapper";
import FormMessage from "./FormMessage";
import { loginSchema } from "./Schemas";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api-call/auth-api";
import { AUTH_KEY } from "../../constants/react-query";
import { toast } from "react-toastify";
import useErrorToest from "../../Hooks/useErrorToest";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: [AUTH_KEY],
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = async (values) => {
    await mutateAsync({
      email: values.email,
      password: values.password,
    });

    if (!isError) {
      toast.success("User is logged in!");
    }
  };

  useErrorToest({ error, isError });

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
      footText="Don't have an account?"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4 pb-4">
        <Inputs name="email" formik={formik} label="Email" type="email" />
        <Inputs
          name="password"
          formik={formik}
          label="Password"
          type="password"
        />
        <div className="w-full text-end">
          <Link className="!text-center w-full" to={"/auth/fotgot/password"}>
            <Button variant="link" fontSize="xs" fontWeight="400">
              Forgot Password?
            </Button>
          </Link>
        </div>
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

export default SignIn;
