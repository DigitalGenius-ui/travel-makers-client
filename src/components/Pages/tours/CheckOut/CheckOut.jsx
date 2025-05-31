import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getStorage } from "../../../../Helpers/localStorage";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "../../../../Context/UserContext";
import ErrorApi from "../../../../utils/ErrorApi";
import { createTicket } from "../../../../api-call/tour-api";

const CheckOut = () => {
  const savedTicket = getStorage("ticket");
  const { currentUser } = useCurrentUser();

  const toast = useToast();

  const data = {
    userId: currentUser?.id,
    ...savedTicket,
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: createTicket,
  });

  const saveTicket = async () => {
    try {
      await mutateAsync(data);
      localStorage.removeItem("ticket");
      toast({
        title: "Ticket number has been sent.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  if (isError) {
    return <ErrorApi errorText={error} />;
  }
  return (
    <section className="h-[500px] grid place-items-center bg-darkBlue">
      <div className="w-[95%] md:w-[42rem] bg-white rounded-md p-5 text-center space-y-2">
        <span className="inline-block">
          <FaCircleCheck className="text-4xl text-emerald-700" />
        </span>
        <h1 className="flex items-center justify-center gap-1 text-xl text-emerald-700 font-semibold">
          Payment Successful!
        </h1>
        {savedTicket ? (
          <p className="text-sm sm:px-7">
            Your payment has been successfully processed. Click below to receive
            your ticket number.
          </p>
        ) : (
          <p className="text-sm sm:px-7">
            A copy of your ticket has been sent to your email. Please provide it
            at the day of your vacation.
          </p>
        )}
        {savedTicket ? (
          <Button
            isLoading={isPending}
            type="button"
            onClick={saveTicket}
            colorScheme="blue"
          >
            Get Ticket
          </Button>
        ) : (
          <Link to="/" className="inline-block !mt-[2rem]">
            <Button colorScheme="blue">Go Back Home</Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CheckOut;
