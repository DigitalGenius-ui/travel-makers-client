import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      size="xs"
      variant="outline"
      colorScheme="whiteAlpha"
      color="white"
      py={4}
      leftIcon={<IoMdArrowRoundBack className="text-lg" />}>
      Go Back
    </Button>
  );
};

export default GoBack;
