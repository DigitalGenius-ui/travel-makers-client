import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must be include 8 letter with [!@#$%^&*] and upper + lower cases"
    ),
  rePassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords are not matching"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must be include 8 letter with [!@#$%^&*] and upper + lower cases"
    ),
});
