import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { changePasswordSchema } from "../InputsSchemas";
import { inputs } from "./data";
import Inputs from "./Inputs";
import { useParams } from "react-router-dom";
import { ActionButton } from "../../../../utils/ActionButton";
import useCreateData from "../../../../hooks/useCreateData";
import { changeProfilePassword } from "../../../../api-call/user-api";
import { USER_KEY } from "../../../../constants/react-query";

type changePassType = {
  currentPassword: string;
  newPassword: string;
  repPassword: string;
};

const ChangePassword = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { id: userId } = useParams();

  const { submitForm, isPending } = useCreateData({
    key: USER_KEY,
    func: changeProfilePassword,
  });

  const handleSubmit = async ({
    currentPassword,
    newPassword,
  }: changePassType) => {
    const inputData = { currentPassword, newPassword, userId };

    await submitForm({
      inputData,
      dataMessage: "Passwords have been changed",
    });
    formik.resetForm({
      values: { currentPassword: "", newPassword: "", repPassword: "" },
    });
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="space-y-5 spaces shadow-md p-3 mt-3">
      <h2 className="font-semibold">Manage Your Password :</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {inputs.map((item, i) => (
          <Inputs
            key={i}
            label={item.label}
            name={item.name}
            isActive={isEdit}
            formik={formik}
          />
        ))}
        {isEdit && (
          <HStack spacing={3}>
            <ActionButton
              onClick={() => console.log("clicked")}
              isPending={isPending}
              type="submit"
            >
              Change Password
            </ActionButton>
            <ActionButton onClick={() => setIsEdit(false)} variant="outline">
              Cancel
            </ActionButton>
          </HStack>
        )}
      </form>
      {!isEdit && (
        <ActionButton onClick={() => setIsEdit(true)}>
          Change Password
        </ActionButton>
      )}
    </div>
  );
};

export default ChangePassword;
