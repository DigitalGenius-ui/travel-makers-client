import {
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Activity, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCreateData from "../../../../hooks/useCreateData";
import CustomeModal from "../../../../utils/CustomeModal";
import { ActionButton } from "../../../../utils/ActionButton";
import { profileDetailsUpdate } from "../../../../api-call/user-api";
import { USER_KEY } from "../../../../constants/react-query";
import { useCurrentUser } from "../../../../context/UserContext";

type lables = "Facebook Link" | "LinkedIn" | "Instagram Link" | "X Media Link";
type names = "facebook" | "linkedIn" | "instagram" | "xMedia";

type inputProps = {
  label: lables;
  name: names;
};

const InputsArr: inputProps[] = [
  { label: "Facebook Link", name: "facebook" },
  { label: "LinkedIn", name: "linkedIn" },
  { label: "Instagram Link", name: "instagram" },
  { label: "X Media Link", name: "xMedia" },
];

type socialType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type formType = {
  facebook: string;
  linkedIn: string;
  instagram: string;
  xMedia: string;
  userId: string | undefined;
};

const SocialLinks = ({ showModal, setShowModal }: socialType) => {
  const { id: userId } = useParams();
  const { currentUser } = useCurrentUser();
  const getSocial = currentUser?.profile;

  const [form, setForm] = useState<formType>({
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
    key: USER_KEY,
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
    <CustomeModal showModal={showModal}>
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
            <ActionButton isPending={isPending} onClick={handleSubmit}>
              Submit
            </ActionButton>
          </VStack>
        </div>
      </section>
    </CustomeModal>
  );
};

export default SocialLinks;

type inputsProps = {
  item: inputProps;
  form: formType;
  setForm: React.Dispatch<React.SetStateAction<formType>>;
};

const Inputs = ({ item, form, setForm }: inputsProps) => {
  const { label, name } = item;
  const error = form[name] && !form[name].startsWith("https://");

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

      <Activity mode={error ? "visible" : "hidden"}>
        <span className="text-xs text-red-500">Url must starts with https</span>
      </Activity>
    </FormControl>
  );
};
