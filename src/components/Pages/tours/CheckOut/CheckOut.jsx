import { Button } from "@chakra-ui/react";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CheckOut = () => {
  return (
    <section className="h-[500px] grid place-items-center bg-darkBlue">
      <div className="w-[95%] md:w-[42rem] bg-white rounded-md p-5 text-center space-y-2">
        <span className="inline-block">
          <FaCircleCheck className="text-4xl text-emerald-700" />
        </span>
        <h1 className="flex items-center justify-center gap-1 text-xl text-emerald-700 font-semibold">
          Payment Successful!
        </h1>
        <p className="text-sm sm:px-7">
          Your payment has been successfully processed, and your order is now
          confirmed. We appreciate your business and are thrilled to have you as
          our customer.
        </p>
        <Link to="/" className="inline-block !mt-[2rem]">
          <Button colorScheme="blue">Go Back Home</Button>
        </Link>
      </div>
    </section>
  );
};

export default CheckOut;
