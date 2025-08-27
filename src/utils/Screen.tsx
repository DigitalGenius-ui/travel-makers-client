import { Container } from "@chakra-ui/react";
import React from "react";

const Screen = ({ children }: { children: React.ReactNode }) => {
  return <Container maxW={{ base: "95%", lg: "90%" }}>{children}</Container>;
};

export default Screen;
