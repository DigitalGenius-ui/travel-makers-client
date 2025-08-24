import { CloseButton, Flex, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ActionButton } from "../../../../../utils/ActionButton";
import useCreateData from "../../../../../Hooks/useCreateData";
import Modal from "../../../../../utils/Modal";
import { profileDetailsUpdate } from "../../../../../api-call/user-api";
import { USER_KEY } from "../../../../../constants/react-query";

const BioEdit = ({ showModal, setShowModal, bioText }) => {
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (bioText) {
      setBio(bioText);
    } else {
      setBio("");
    }
  }, [bioText]);

  const { isPending, submitForm } = useCreateData({
    key: USER_KEY,
    func: profileDetailsUpdate,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = { bio };
    await submitForm({ inputData, dataMessage: "Bio has been updated" });
    setShowModal(false);
  };
  return (
    <Modal showModal={showModal}>
      <div className="grid place-items-center w-full h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-[95%] md:w-[40rem] bg-white p-6 rounded-sm relative"
        >
          <CloseButton
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3"
          />
          <h2 className="text-2xl font-semibold">Add Bio</h2>
          <p className="text-darkText">Introduce yourself to other travelers</p>
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
            <ActionButton onClick={() => setShowModal(false)}>
              Leave
            </ActionButton>
            <ActionButton isPending={isPending} type="submit">
              Submit
            </ActionButton>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default BioEdit;
