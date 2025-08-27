import { Box } from "@chakra-ui/react";
import React from "react";

const CustomeModal = ({
  children,
  showModal,
}: {
  children: React.ReactNode;
  showModal: boolean;
}) => {
  return (
    <>
      <Box
        pos="fixed"
        inset="0"
        bg="rgba(0,0,0,0.6)"
        className={`!transition-all !duration-500
      ${showModal ? "visible opacity-100" : "invisible opacity-0"}`}
        zIndex={9999}
      />
      <Box
        pos="fixed"
        inset="0"
        zIndex={9999}
        className="grid place-items-center"
      >
        {children}
      </Box>
    </>
  );
};

export default CustomeModal;
