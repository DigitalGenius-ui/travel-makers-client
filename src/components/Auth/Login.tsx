import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import Inputs from "./Inputs";
import CardWrapper from "./CartWrapper";
import { loginSchema } from "./Schemas";
import { type loginType, loginUser } from "../../api-call/auth-api";
import { USER_KEY } from "../../constants/react-query";
import { Link, useNavigate } from "react-router-dom";
import useCreateData from "../../hooks/useCreateData";

const SignIn = () => {
  const navigate = useNavigate();

  const { submitForm, isPending } = useCreateData({
    key: USER_KEY,
    func: loginUser,
  });

  const handleSubmit = async (value: loginType) => {
    await submitForm({
      inputData: {
        email: value.email,
        password: value.password,
      },
      dataMessage: "User is logged in!",
    });

    navigate("/", { replace: true });
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
