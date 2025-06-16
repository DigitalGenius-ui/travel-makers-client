import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditInputs from "./EditInput";
import { SubmitButton } from "../../../../utils/SubmitButton";
import ImagePicker from "./ImagePicker";
import useCreateData from "../../../../Hooks/useCreateData";
import { useCurrentUser } from "../../../../Context/UserContext";
import { profileDetailsUpdate } from "../../../../api-call/user-api";
import ErrorLabel from "../../../../utils/ErrorLabel";
import { sendVerifyCode } from "../../../../api-call/auth-api";
import { USER_KEY } from "../../../../constants/react-query";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const { currentUser } = useCurrentUser();
  const profile = currentUser?.profile;

  const isUserVerified = currentUser?.verified === "true";

  const [form, setForm] = useState({
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
      const { userImg, id, followings, followers, ...rest } = form;
      // upload content to the server
      await handleUpdateProfile({
        inputData: rest,
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
    await handleVerify({ dataMessage: "Verify email has been sent!" });
  };

  return (
    <div className="space-y-5 spaces p-3 mt-3">
      {!isUserVerified && (
        <ErrorLabel
          message={
            <>
              You havn't verified your account yet!
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
        <SubmitButton
          disabled={!isUserVerified}
          isPending={isPending}
          onClick={handleSubmit}
        >
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
