import { HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditInputs from "./EditInput";
import { useQuery } from "@tanstack/react-query";
import {
  profileDetails,
  profileDetailsUpdate,
} from "../../../../FetchData/Profile/profile";
import { SubmitButton } from "../../../../utils/SubmitButton";
import ImagePicker from "./ImagePicker";
import useCreateData from "../../../../Hooks/useCreateData";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(true);

  const pathname = useParams();
  const userId = pathname["*"].split("/")[1];

  const { data } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => profileDetails(userId),
  });

  const profileData = data?.data?.profileDetails;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    userImg: "",
    userId,
  });

  useEffect(() => {
    if (profileData) {
      setForm(profileData);
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
  }, [profileData, userId]);

  const { submitForm, isPending } = useCreateData({
    key: "profile",
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
      // await axios.post("/api/profile", { ...rest });
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const boxes = "flex md:items-center flex-col md:flex-row gap-3";

  return (
    <div className="space-y-5 spaces shadow-md p-3 mt-3">
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
