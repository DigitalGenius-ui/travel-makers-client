import { HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EditInputs from "./EditInput";
import { SubmitButton } from "../../../../utils/SubmitButton";
import ImagePicker from "./ImagePicker";
import useCreateData from "../../../../Hooks/useCreateData";
import { useCurrentUser } from "../../../../Context/UserContext";
import { profileDetailsUpdate } from "../../../../api-call/user-api";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const { currentUser } = useCurrentUser();
  const profile = currentUser?.profile;

  const userId = currentUser?.id;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    userImg: "",
    userId,
  });

  useEffect(() => {
    if (profile) {
      setForm(profile);
    } else {
      setForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        userImg: "",
        userId,
      });
    }
  }, [profile, userId]);

  const { submitForm, isPending } = useCreateData({
    key: "user",
    func: profileDetailsUpdate,
  });

  const handleSubmit = async () => {
    if (!isEdit) {
      const { userImg, id, ...rest } = form;
      // upload content to the server
      await submitForm({
        inputData: rest,
        dataMessage: "Profile has been updated",
      });

      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const boxes = "flex md:items-center flex-col md:flex-row gap-3";

  return (
    <div className="space-y-5 spaces p-3 mt-3">
      <h2 className="font-semibold">Your Profile Details :</h2>
      {/* img input  */}
      <ImagePicker setForm={setForm} form={form} isEdit={isEdit} />
      <div className={boxes}>
        <EditInputs
          label="Last name"
          name={"lastName"}
          form={form}
          setForm={setForm}
          isActive={isEdit}
        />
        <EditInputs
          label="First & middle names"
          name={"firstName"}
          setForm={setForm}
          form={form}
          isActive={isEdit}
        />
      </div>
      <div className={boxes}>
        <EditInputs
          label="Date of birth"
          name={"birthDate"}
          type={isEdit ? "text" : "date"}
          setForm={setForm}
          form={form}
          isActive={isEdit}
        />
        <EditInputs
          label="Gender"
          name={"gender"}
          gender={!isEdit ? ["Male", "Female"] : null}
          setForm={setForm}
          form={form}
          isActive={isEdit}
        />
      </div>
      <HStack spacing={4} alignItems="flex-start">
        <SubmitButton isPending={isPending} onClick={handleSubmit}>
          {!isEdit ? "Save Changes" : "Edit"}
        </SubmitButton>
        {!isEdit && (
          <SubmitButton onClick={() => setIsEdit(true)} variant="outline">
            cancel
          </SubmitButton>
        )}
      </HStack>
    </div>
  );
};

export default MyProfile;
