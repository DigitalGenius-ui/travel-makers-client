import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditInputs from "./EditInput";
import { ActionButton } from "../../../../utils/ActionButton";
import ImagePicker from "./ImagePicker";
import useCreateData from "../../../../Hooks/useCreateData";
import { useCurrentUser } from "../../../../Context/UserContext";
import { profileDetailsUpdate } from "../../../../api-call/user-api";
import ErrorLabel from "../../../../utils/ErrorLabel";
import { sendVerifyCode } from "../../../../api-call/auth-api";
import { USER_KEY } from "../../../../constants/react-query";

export type profileForm = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  userImg: string;
};

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const { currentUser } = useCurrentUser();
  const profile = currentUser?.profile;

  const isUserVerified = currentUser?.verified === "VERIFIED";

  const [form, setForm] = useState<profileForm>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    userImg: "",
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
      });
    }
  }, [profile]);

  const { submitForm: handleUpdateProfile, isPending } = useCreateData({
    key: USER_KEY,
    func: profileDetailsUpdate,
  });

  const handleSubmit = async () => {
    if (!isEdit) {
      const { firstName, lastName, birthDate, gender } = form;
      // upload content to the server
      await handleUpdateProfile({
        inputData: { firstName, lastName, birthDate, gender },
        dataMessage: "Profile has been updated",
      });

      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const boxes = "flex md:items-center flex-col md:flex-row gap-3";

  // send verify email

  const { submitForm: handleVerify, isPending: verifyPending } = useCreateData({
    key: USER_KEY,
    func: sendVerifyCode,
  });

  const handleSendEmail = async () => {
    await handleVerify({
      inputData: {},
      dataMessage: "Verify email has been sent!",
    });
  };

  // make sure the user is at least 16 years old
  const today = new Date();
  today.setFullYear(today.getFullYear() - 16);
  const formatted = today.toISOString().split("T")[0];

  return (
    <div className="space-y-5 spaces p-3 mt-3">
      {!isUserVerified && (
        <ErrorLabel
          message={
            <>
              You havn&apos;t verified your account yet!
              <button onClick={handleSendEmail} className="font-bold">
                {verifyPending
                  ? "Sending your code..."
                  : "Click to verifiy your account"}
              </button>
            </>
          }
        />
      )}
      <h2 className="font-semibold">Your Profile Details :</h2>
      {/* img input  */}
      <ImagePicker form={form} isEdit={isEdit} />
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
          max={formatted}
        />
        <EditInputs
          label="Gender"
          name={"gender"}
          gender={!isEdit ? ["male", "female"] : null}
          setForm={setForm}
          form={form}
          isActive={isEdit}
        />
      </div>
      <HStack spacing={4} alignItems="flex-start">
        <ActionButton
          disabled={!isUserVerified}
          isPending={isPending}
          onClick={handleSubmit}
        >
          {!isEdit ? "Save Changes" : "Edit"}
        </ActionButton>
        {!isEdit && (
          <ActionButton onClick={() => setIsEdit(true)} variant="outline">
            cancel
          </ActionButton>
        )}
      </HStack>
    </div>
  );
};

export default MyProfile;
