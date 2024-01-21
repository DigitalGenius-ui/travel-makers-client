import { Checkbox } from "@chakra-ui/react";
import React from "react";

const TermAndCondition = ({ formik }) => {
  return (
    <>
      <Checkbox
        isInvalid={formik.errors.termCondition}
        isChecked={formik.values.termCondition}
        onChange={(e) =>
          formik.setFieldValue("termCondition", e.target.checked)
        }
        onBlur={formik.handleBlur}
        name="termCondition"
        py="1rem"
        w="100%">
        <p className="text-sm text-gray-500">
          By uploading these photos, I affirm that they belong to me and that I
          agree to be bound by Trip.com's
          <button className="text-blue-500">Terms & Conditions</button> &
          <button className="text-blue-500 pl-1">Community Rules</button> .
        </p>
      </Checkbox>
      {formik.errors.termCondition && formik.touched.termCondition && (
        <span className="text-red-500 text-xs capitalize">
          {formik.errors.termCondition}
        </span>
      )}
    </>
  );
};

export default TermAndCondition;
