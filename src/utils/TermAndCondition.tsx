import { Checkbox } from "@chakra-ui/react";
import type { FormikProps } from "formik";

interface termType<T> {
  formik: FormikProps<T>;
}

const TermAndCondition = <T extends { termCondition: boolean }>({
  formik,
}: termType<T>) => {
  return (
    <>
      <Checkbox
        isInvalid={!!formik.errors.termCondition}
        isChecked={formik.values.termCondition}
        onChange={(e) =>
          formik.setFieldValue("termCondition", e.target.checked)
        }
        onBlur={formik.handleBlur}
        name="termCondition"
        py="1rem"
        w="100%"
      >
        <p className="text-sm text-gray-500">
          By uploading these photos, I affirm that they belong to me and that I
          agree to be bound by Trip.com&apos;s
          <button className="text-blue-500">Terms & Conditions</button> &
          <button className="text-blue-500 pl-1">Community Rules</button> .
        </p>
      </Checkbox>
      {formik.touched.termCondition &&
        typeof formik.errors.termCondition === "string" && (
          <span className="text-red-500 text-xs capitalize">
            {formik.errors.termCondition}
          </span>
        )}
    </>
  );
};

export default TermAndCondition;
