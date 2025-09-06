import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useBookingContext } from "../../../../../../Context/BookingContext";
import classNames from "classnames";

const Activity = () => {
  const [isTraveler, setIsTraveler] = useState(false);
  const { bookForm, setBookForm, errorMsg, setErrorMsg } = useBookingContext();

  const removeTraveler = () => {
    setIsTraveler(false);
    setBookForm((prev) => ({ ...prev, firstName: "", lastName: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg("");
  };

  return (
    <section className="secondBg !top-[-2.6rem] rounded-md space-y-3">
      <div className="space-y-1">
        <h2
          className={`text-lg md:text-xl font-bold 
          ${classNames({ "text-red-500": errorMsg === "traveler" })}`}
        >
          Activity Info
        </h2>
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
              fontSize="0.8rem"
            >
              <RiUserUnfollowLine className="inline-block mr-1" />
              Remove Traveler
            </Button>
          </Flex>
          <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
            <Input
              isInvalid={errorMsg === "traveler"}
              name="firstName"
              onChange={handleChange}
              value={bookForm.firstName}
              placeholder="First Name..."
              fontSize="0.9rem"
              size="lg"
            />
            <Input
              isInvalid={errorMsg === "traveler"}
              name="lastName"
              onChange={handleChange}
              value={bookForm.lastName}
              placeholder="Last Name..."
              fontSize="0.9rem"
              size="lg"
            />
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
          leftIcon={<AiOutlinePlusCircle />}
        >
          Add Traveler
        </Button>
      )}
    </section>
  );
};

export default Activity;
