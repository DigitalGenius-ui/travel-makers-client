import { HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditInputs from "./EditInput";
import { useQuery } from "@tanstack/react-query";
import { profileDetails } from "../../../../FetchData/Profile/profile";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [isPending, setIsPending] = useState(false);

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

  // const { submitForm } = useCreateData({
  //   key: "profile",
  //   func: createProfileDetails,
  // });

  // const handleSubmit = async () => {
  //   setIsPending(true);
  //   if (!isEdit) {
  //     // upload profile image
  //     const { userImg, ...rest } = form;
  //     let imageUrl = profileData?.userImg;
  //     if (form.userImg) {
  //       imageUrl = await uploadSingleImage(form.userImg);
  //     }
  //     // upload content to the server
  //     const values = { ...rest, userImg: imageUrl };
  //     await submitForm({
  //       inputData: values,
  //       dataMessage: "Profile has been updated",
  //     });
  //     setIsEdit(true);
  //     setIsPending(false);
  //   } else {
  //     setIsEdit(false);
  //     setIsPending(false);
  //   }
  // };

  const boxes = "flex md:items-center flex-col md:flex-row gap-3";

  return (
    <div className="space-y-5 spaces shadow-md p-3 mt-3">
      <h2 className="font-semibold">Your Profile Details :</h2>
      {/* img input  */}
      {/* <ImagePicker setForm={setForm} form={form} isEdit={isEdit} /> */}
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
      {/* <HStack spacing={4} alignItems="flex-start">
        <SubmitButton isPending={isPending} onClick={handleSubmit}>
          {!isEdit ? "Save Changes" : "Edit"}
        </SubmitButton>
        {!isEdit && (
          <SubmitButton onClick={() => setIsEdit(true)} variant="outline">
            cancel
          </SubmitButton>
        )}
      </HStack> */}
    </div>
  );
};

export default MyProfile;
