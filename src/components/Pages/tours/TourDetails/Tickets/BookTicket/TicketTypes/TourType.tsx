import { HStack, IconButton, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { Activity, useCallback, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useBookingContext } from "../../../../../../../context/BookingContext";
import Conditions from "../../../../Common/Condition";
import useGetTours from "../../../../../../../hooks/useGetTours";
import { useParams } from "react-router-dom";
import classNames from "classnames";

const TourType = ({ title }: { title: "adult" | "child" }) => {
  const [showModal, setShowModal] = useState(false);

  // global context data
  const { bookForm, setBookForm, setErrorMsg, errorMsg } = useBookingContext();

  // getting tour price
  const { tourId } = useParams();
  const { tourData } = useGetTours();
  const singleBooking = tourData?.allTours.find((item) => item.id === tourId);

  // increase ticket number
  const increase = useCallback(() => {
    if (bookForm.date === "") {
      setErrorMsg("date");
    } else {
      setBookForm((prev) => ({ ...prev, [title]: prev[title] + 1 }));
      setErrorMsg("");
    }
  }, [bookForm.date, setErrorMsg, setBookForm, title]);

  // decrease ticket number
  const decrease = useCallback(() => {
    setBookForm((prev) => {
      const updatedData = prev[title] <= 0 ? 0 : prev[title] - 1;
      return { ...prev, [title]: updatedData };
    });
  }, [title, setBookForm]);

  // displaying the child and adult prices
  const price = {
    child: +singleBooking!?.price * (1 - 0.4),
    adult: +singleBooking!?.price,
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2
          className={`font-bold capitalize text-lg md:text-xl 
        ${classNames({ "text-red-500": errorMsg === "ticket" })}`}
        >
          {title} Ticket
        </h2>
        <HStack spacing={3}>
          <p className="font-bold">$ {price[title]!.toFixed(2)}</p>
          <HStack spacing={3}>
            <IconButton
              onClick={decrease}
              isRound={true}
              size="xs"
              aria-label="minus"
              colorScheme={bookForm[title] > 0 ? "blue" : "gray"}
              icon={<FiMinus />}
            />
            <span>{bookForm[title]}</span>
            <IconButton
              onClick={increase}
              isRound={true}
              size="xs"
              aria-label="plus"
              colorScheme="blue"
              icon={<FaPlus />}
            />
          </HStack>
        </HStack>
      </div>
      {/* tour type of people details  */}
      {bookForm[title] > 0 ? (
        <VStack
          onClick={() => setShowModal(true)}
          spacing={1}
          mt="1rem"
          alignItems="flex-start"
          fontWeight="semibold"
          cursor="pointer"
        >
          <p className="text-[0.7rem] text-darkText">
            <FaRegUser className="inline-block mr-2 text-[0.9rem]" />
            Age: 1–12 years old (
            {`Refers to travelers' ages on the date of
            travel. Age is calculated according to date of birth.`}
            )
          </p>
          <p className="text-[0.7rem] text-darkText">
            <IoInformationCircleOutline className="inline-block mr-2 text-[1rem]" />
            Ready to Use Immediately |
            <span className="text-orange-600">Non-refundable</span> | Ticket
            Redemption Not Required | Booking Information
          </p>
        </VStack>
      ) : (
        <p className="text-sm text-gray-500 pt-2">
          <IoInformationCircleOutline className="inline-block mr-2 text-lg" />
          Booking Information
        </p>
      )}
      {/* show condition for booking the tickets  */}
      <Activity mode={showModal ? "visible" : "hidden"}>
        <Conditions showModal={showModal} setShowModal={setShowModal} />
      </Activity>
    </>
  );
};

export default TourType;
