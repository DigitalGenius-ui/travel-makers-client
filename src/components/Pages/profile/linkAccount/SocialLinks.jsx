import {
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCreateData from "../../../../Hooks/useCreateData";
import Modal from "../../../../utils/Modal";
import { SubmitButton } from "../../../../utils/SubmitButton";
import { profileDetailsUpdate } from "../../../../api-call/user-api";
import { USER_KEY } from "../../../../constants/react-query";
import { useCurrentUser } from "../../../../Context/UserContext";

const InputsArr = [
  { label: "Facebook Link", name: "facebook" },
  { label: "LinkedIn", name: "linkedIn" },
  { label: "Instagram Link", name: "instagram" },
  { label: "X Media Link", name: "xMedia" },
];

const SocialLinks = ({ showModal, setShowModal }) => {
  const { id: userId } = useParams();
  const { currentUser } = useCurrentUser();
  const getSocial = currentUser?.profile;

  const [form, setForm] = useState({
    facebook: "",
    linkedIn: "",
    instagram: "",
    xMedia: "",
    userId,
  });

  useEffect(() => {
    if (getSocial) {
      setForm({
        facebook: getSocial?.facebook,
        linkedIn: getSocial?.linkedIn,
        instagram: getSocial?.instagram,
        xMedia: getSocial?.xMedia,
        userId,
      });
    } else {
      setForm({
        facebook: "",
        linkedIn: "",
        instagram: "",
        xMedia: "",
        userId,
      });
    }
  }, [getSocial, userId]);

  const { submitForm, isPending } = useCreateData({
    key: { USER_KEY },
    func: profileDetailsUpdate,
  });

  const handleSubmit = async () => {
    await submitForm({
      inputData: form,
      dataMessage: "Social links are updated",
    });
    setShowModal(false);
  };

  return (
    <Modal showModal={showModal}>
      <section className="w-full h-screen grid place-items-center">
        <div className="w-[90%] md:w-[33rem] bg-white p-4 rounded-md relative">
          <Flex alignItems="center" justifyContent="space-between">
            <h2 className="font-semibold">Link Your Social Accounts</h2>
            <CloseButton onClick={() => setShowModal(false)} />
          </Flex>
          <VStack mt="1rem" spacing={4} alignItems="flex-start">
            {InputsArr.map((item) => (
              <Inputs
                item={item}
                key={item.label}
                form={form}
                setForm={setForm}
              />
            ))}
            <SubmitButton isPending={isPending} onClick={handleSubmit}>
              Submit
            </SubmitButton>
          </VStack>
        </div>
      </section>
    </Modal>
  );
};

export default SocialLinks;

const Inputs = ({ item, form, setForm }) => {
  const { label, name } = item;
  let error = form[name] && !form[name].startsWith("https://");

  return (
    <FormControl>
      <FormLabel className="!text-sm">{label}</FormLabel>
      <Input
        value={form[name] || ""}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={`${label}...`}
        fontSize="sm"
        type="text"
      />
      {error && (
        <span className="text-xs text-red-500">Url must starts with https</span>
      )}
    </FormControl>
  );
};
