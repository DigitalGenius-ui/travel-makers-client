import { Button } from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../../Context/UserContext";
import { createTicket } from "../../../../api-call/tour-api";
import useCreateData from "../../../../Hooks/useCreateData";
import { USER_KEY } from "../../../../constants/react-query";

const CheckOut = () => {
  const savedTicket = JSON.parse(localStorage.getItem("ticket")!);
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const data = {
    userId: currentUser?.id,
    ...savedTicket,
  };

  const { submitForm, isPending } = useCreateData({
    key: USER_KEY,
    func: createTicket,
  });

  const saveTicket = async () => {
    const ticketData = await submitForm({
      inputData: data,
      dataMessage: "Ticket has been sent to your email.",
    });
    localStorage.removeItem("ticket");
    navigate(`/profile/booking/${ticketData?.userId}`);
  };

  return (
    <section className="h-[500px] grid place-items-center bg-darkBlue">
      <div className="w-[95%] md:w-[42rem] bg-white rounded-md p-5 text-center space-y-2">
        <span className="inline-block">
          <FaCircleCheck className="text-4xl text-emerald-700" />
        </span>
        <h1 className="flex items-center justify-center gap-1 text-xl text-emerald-700 font-semibold">
          {!saveTicket ? "Ticket has been sent" : "Payment Successful!"}
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
