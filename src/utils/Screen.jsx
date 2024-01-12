import { Container } from "@chakra-ui/react";

const Screen = ({ children }) => {
  return <Container maxW={{ base: "95%", lg: "90%" }}>{children}</Container>;
};

export default Screen;
