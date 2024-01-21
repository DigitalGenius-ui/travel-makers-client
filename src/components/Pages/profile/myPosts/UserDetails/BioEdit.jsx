import { CloseButton, Flex, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "../../../../../utils/SubmitButton";
import useCreateData from "../../../../../Hooks/useCreateData";
import Modal from "../../../../../utils/Modal";
import { profileDetailsUpdate } from "../../../../../FetchData/User/UserDetails";

const BioEdit = ({ showModal, setShowModal, userId, bioText }) => {
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (bioText) {
      setBio(bioText);
    } else {
      setBio("");
    }
  }, [bioText]);

  const { isPending, submitForm } = useCreateData({
    key: "user",
    func: profileDetailsUpdate,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inputData = { bio, userId };
      await submitForm({ inputData, dataMessage: "Bio has been updated" });
      setShowModal(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <Modal showModal={showModal}>
      <div className="grid place-items-center w-full h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-[95%] md:w-[40rem] bg-white p-6 rounded-sm relative">
          <CloseButton
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3"
          />
          <h2 className="text-2xl font-semibold">Add Bio</h2>
          <p className="text-gray-600">Introduce yourself to other travelers</p>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio..."
            my={4}
            resize="none"
            fontSize="sm"
            name="bio"
          />
          <Flex justifyContent="flex-end" gap={2}>
            <SubmitButton onClick={() => setShowModal(false)}>
              Leave
            </SubmitButton>
            <SubmitButton isPending={isPending} type="submit">
              Submit
            </SubmitButton>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default BioEdit;
