import * as yup from "yup";

// create post schema
export const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .required("Your post need to have a title")
    .min(10)
    .max(100),
  desc: yup
    .string()
    .required("Your post needs to have a description.")
    .min(20)
    .max(1000),
  location: yup.string().required("You must select a location."),
  postImages: yup
    .array()
    .of(yup.string())
    .min(1, "At least one image should be uploaded"),
  termCondition: yup
    .boolean()
    .oneOf([true], "You must agree with terms and condition."),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must be include 8 letter with [!@#$%^&*] and upper + lower cases"
    ),
  newPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must be include 8 letter with [!@#$%^&*] and upper + lower cases"
    ),
  repPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords are not matching"),
});
