import { Box, Button, Checkbox, Flex, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Head from "../../../../../../utils/Head";
import Screen from "../../../../../../utils/Screen";
import useGetTours from "../../../../../../hooks/useGetTours";
import TotalPrice from "./TotalPrice";
import DatePicker from "./DatePicker";
import TicketTypes from "./TicketTypes/TicketTypes";
import Activity from "./Activity";
import Contact from "./Contact/Contact";
import { useBookingContext } from "../../../../../../context/BookingContext";
import {
  createCheckout,
  type checkoutType,
  type createTicketType,
} from "../../../../../../api-call/tour-api";
import useCreateData from "../../../../../../hooks/useCreateData";
import { USER_KEY } from "../../../../../../constants/react-query";
import type React from "react";

const BookTicket = () => {
  const { tourId } = useParams();
  const { tourData } = useGetTours();
  const singleBooking = tourData?.find((item) => item.id === tourId);

  const toast = useToast();

  const { setBookForm, bookForm, totalPrice, contactCode, setErrorMsg } =
    useBookingContext();

  const { submitForm, isPending } = useCreateData({
    key: USER_KEY,
    func: createCheckout,
  });

  const bookTicket = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bookForm.child === 0 && bookForm.adult === 0) {
      toast({
        title: "You should choose at least one ticket",
        status: "error",
        isClosable: true,
      });
      setErrorMsg("ticket");
      return;
    }

    if (!bookForm.firstName || !bookForm.lastName) {
      toast({
        title: "You should add the traveler details",
        status: "error",
        isClosable: true,
      });
      setErrorMsg("traveler");
      return;
    }

    if (!bookForm.phone || !bookForm.email) {
      toast({
        title: "You should add your contact details.",
        status: "error",
        isClosable: true,
      });
      setErrorMsg("contact");
      return;
    }

    const { phone, sendDeal, ...rest } = bookForm;

    const bookData: createTicketType = {
      totalPrice: String(totalPrice),
      phone: `${contactCode} ${phone}`,
      ...rest,
      userId: singleBooking?.userId,
      tourImage: singleBooking?.tourImages[0],
      title: singleBooking?.title,
    };

    const formItems: checkoutType[] = [
      {
        name: "Child Ticket",
        image: singleBooking?.tourImages[0],
        description: singleBooking?.title,
        price: +singleBooking!?.price * (1 - 0.4),
        quantity: bookForm.child,
        id: singleBooking?.id,
      },
      {
        name: "Adult Ticket",
        image: singleBooking?.tourImages[0],
        description: singleBooking?.title,
        price: +singleBooking!?.price,
        quantity: bookForm.adult,
        id: singleBooking?.id,
      },
    ];

    const url = await submitForm({
      inputData: formItems,
      dataMessage: "Ticked payment is set!",
    });

    localStorage.setItem("ticket", JSON.stringify(bookData));
    if (typeof url === "string") {
      window.location.href = url;
    }
  };

  return (
    <section className="bg-darkBlue">
      <Head shareHidden />
      <div className="roundedBg py-5 mt-[6rem]">
        <Screen>
          <Flex gap={5} flexDirection={{ base: "column-reverse", md: "row" }}>
            <form
              className="w-full md:w-[10rem] flex-[2.5] space-y-1"
              onSubmit={bookTicket}
            >
              <Box as="div" className="secondBg round" w="100%">
                <h2
                  className="font-bold text-lg md:text-xl border-b border-dashed 
                  border-gray-300 pt-2 pb-4"
                >
                  {singleBooking?.title}
                </h2>
                <DatePicker />
              </Box>
              <TicketTypes bookPrice={Number(singleBooking?.price)} />
              <Activity />
              <Contact />
              <section className="secondBg rounded-md !top-[-1.7rem] space-y-4 !z-[30]">
                <div className="space-y-2">
                  <p className="text-[0.8rem]">
                    {`By proceeding, I acknowledge that I have read and agree to
                    Travel.com's`}
                    <span className="text-blue-500 ml-1">Terms of Use</span> and
                    <span className="text-blue-500 ml-1">
                      Privacy Statement
                    </span>
                    .
                  </p>
                  <Checkbox
                    onChange={(e) =>
                      setBookForm((prev) => ({
                        ...prev,
                        sendDeal: e.target.checked,
                      }))
                    }
                    size="sm"
                  >
                    Send me special travelmakers.com deals and travel reminders
                  </Checkbox>
                </div>
                <Button
                  isLoading={isPending}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  w="100%"
                  mt="1.5rem"
                  py="1.5rem"
                >
                  Pay
                </Button>
              </section>
            </form>
            {/* side bare for total price  */}
            <div className="relative flex-[1]">
              <TotalPrice
                bookPrice={Number(singleBooking?.price)}
                ticketTitle={singleBooking?.title}
              />
            </div>
          </Flex>
        </Screen>
      </div>
    </section>
  );
};

export default BookTicket;
