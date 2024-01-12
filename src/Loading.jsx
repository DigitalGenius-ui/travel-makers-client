import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  const { onClose } = useDisclosure();
  return (
    <Modal onClose={onClose} size="full" isOpen={true}>
      <ModalOverlay />
      <ModalContent display="grid" placeItems="center">
        <ModalBody>
          <BeatLoader
            loading={true}
            size={30}
            color="#04246b"
            aria-label="Loading BeatLoader"
            data-testid="BeatLoader"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
{
}

export default Loading;
