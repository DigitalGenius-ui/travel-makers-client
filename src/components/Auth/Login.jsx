import { Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Inputs from "./Inputs";
import CardWrapper from "./CartWrapper";
import { loginSchema } from "./Schemas";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api-call/auth-api";
import { AUTH_KEY, USER_KEY } from "../../constants/react-query";
import useErrorToest from "../../Hooks/useErrorToest";
import { Link, useNavigate } from "react-router-dom";
import { queryClient } from "../../config/queryClient";

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: [AUTH_KEY],
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = async (values) => {
    await mutateAsync({
      email: values.email,
      password: values.password,
    });

    if (!isError) {
      toast({
        title: "User is logged in!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
