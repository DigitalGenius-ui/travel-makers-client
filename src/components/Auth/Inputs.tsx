import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { Activity, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

type inputType = {
  label: string;
  type: string;
  formik: any;
  name: string;
};

const Inputs = ({ label, type, formik, name }: inputType) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordEnable = showPassword ? "text" : "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <InputGroup>
        <Input
          isInvalid={formik?.errors[name] && formik?.touched[name]}
          name={name}
          onChange={handleChange}
          onBlur={formik?.handleBlur}
          placeholder={`${label}...`}
          fontSize="sm"
          value={formik.values[name]}
          type={type === "password" ? passwordEnable : type}
        />
        {type === "password" && (
          <InputRightElement
            cursor="pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {!showPassword ? <FaRegEye /> : <IoIosEyeOff />}
          </InputRightElement>
        )}
      </InputGroup>
      <Activity
        mode={
          formik?.errors[name] && formik?.touched[name] ? "visible" : "hidden"
        }
      >
        <span className="text-xs text-red-500 first-letter:uppercase">
          {formik?.errors[name]}
        </span>
      </Activity>
    </FormControl>
  );
};

export default Inputs;
