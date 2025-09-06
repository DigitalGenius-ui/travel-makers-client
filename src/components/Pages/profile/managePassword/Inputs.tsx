import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

type inputType = {
  label: string;
  name: string;
  isActive: boolean;
  formik: any;
};

const Inputs = ({ label, name, isActive, formik }: inputType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };
  return (
    <FormControl
      isDisabled={!isActive}
      isInvalid={formik?.errors[name] && formik?.touched[name]}
    >
      <FormLabel className="text-gray-500 !text-xs">{label}</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          onBlur={formik?.handleBlur}
          onChange={handleChange}
          className="!w-full !text-sm"
          placeholder={label + "..."}
          variant="filled"
        />
        {/* show and hid password button  */}
        <InputRightElement
          cursor="pointer"
          color={!isActive ? "gray" : "initial"}
          pointerEvents={!isActive ? "none" : "all"}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {!showPassword ? <FaRegEye /> : <IoIosEyeOff />}
        </InputRightElement>
      </InputGroup>
      {/* show error message  */}
      {formik?.errors[name] && formik?.touched[name] && (
        <span className="text-xs text-red-500">{formik?.errors[name]}</span>
      )}
    </FormControl>
  );
};

export default Inputs;
