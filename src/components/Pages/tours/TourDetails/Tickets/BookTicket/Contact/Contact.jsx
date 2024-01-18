import { Flex, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import Selects from "./Selects";

const Contact = () => {
  const [contactCode, setContactCode] = useState("+1");
  return (
    <section className="secondBg rounded-md !top-[-2.1rem] z-[40]">
      <h2 className="text-lg md:text-xl font-bold pb-4">Contact Info</h2>
      <Flex gap={4} flexDirection={{ base: "column-reverse", md: "row" }}>
        <InputGroup size="lg" pos="relative">
          <Selects contactCode={contactCode} setContactCode={setContactCode} />
          <Input
            type="tel"
            placeholder="Phone Number..."
            fontSize="0.9rem"
            bgColor="white"
          />
        </InputGroup>
        <Input
          placeholder="Email..."
          type="email"
          fontSize="0.9rem"
          size="lg"
          bgColor="white"
        />
      </Flex>
    </section>
  );
};

export default Contact;
