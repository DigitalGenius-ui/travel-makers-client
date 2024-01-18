import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Activity = () => {
  const [isTraveler, setIsTraveler] = useState(false);

  const removeTraveler = () => {
    setIsTraveler(false);
    //also should clear the inputs here
  };
  return (
    <section className="secondBg !top-[-2.6rem] rounded-md space-y-3">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold">Activity Info</h2>
        <p className="text-sm">
          {isTraveler
            ? "You've selected 1 traveler as required."
            : "Select 1 traveler"}
        </p>
      </div>
      {isTraveler ? (
        <>
          <Flex justifyContent="space-between">
            <h3 className="text-lg font-bold">Traveler</h3>
            <Button
              onClick={removeTraveler}
              size="sm"
              variant="ghost"
              colorScheme="blue"
              fontSize="0.8rem">
              <RiUserUnfollowLine className="inline-block mr-1" />
              Remove Traveler
            </Button>
          </Flex>
          <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
            <Input placeholder="First Name..." fontSize="0.9rem" size="lg" />
            <Input placeholder="Last Name..." fontSize="0.9rem" size="lg" />
          </Flex>
        </>
      ) : (
        <Button
          onClick={() => setIsTraveler(true)}
          w="100%"
          size="sm"
          fontSize="0.8rem"
          variant="outline"
          py="1.3rem"
          colorScheme="blue"
          leftIcon={<AiOutlinePlusCircle />}>
          Add Traveler
        </Button>
      )}
    </section>
  );
};

export default Activity;
