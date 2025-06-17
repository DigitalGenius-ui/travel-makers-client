import { useState } from "react";
import { useCurrentUser } from "../Context/UserContext";
import { Button, IconButton } from "@chakra-ui/react";
import useCreateData from "../Hooks/useCreateData";
import { HiDotsHorizontal } from "react-icons/hi";
import { MOMENTS_KEYS } from "../constants/react-query";

const RemoveBtn = ({ removeFunc, itemToRemove, inputData, message }) => {
  const { currentUser } = useCurrentUser();
  const [showRemove, setShowRemove] = useState(false);

  const { submitForm, isPending } = useCreateData({
    key: MOMENTS_KEYS,
    func: removeFunc,
  });

  const handleRemove = async () => {
    if (currentUser?.id === itemToRemove.userId) {
      await submitForm({
        inputData,
        dataMessage: message,
      });
    }
  };
  return (
    <>
      {currentUser?.id === itemToRemove.userId && (
        <IconButton
          onClick={() => setShowRemove((prev) => !prev)}
          className="!absolute !top-1 !right-2"
          aria-label="remove-post"
          icon={<HiDotsHorizontal />}
          size="sm"
          fontSize="1.5rem"
          variant="outline"
          colorScheme="teal"
        />
      )}
      {showRemove && (
        <Button
          onClick={handleRemove}
          isLoading={isPending}
          rounded="none"
          borderBottom="4px"
          borderLeft="2px"
          borderColor="black"
          className="!absolute !top-7 !right-2 !px-[3rem]"
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default RemoveBtn;
