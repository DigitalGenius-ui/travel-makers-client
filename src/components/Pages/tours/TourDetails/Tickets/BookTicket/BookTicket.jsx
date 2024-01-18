import React from "react";
import { Box, Button, Checkbox, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Head from "../../../../../../utils/Head";
import Screen from "../../../../../../utils/Screen";
import useGetTours from "../../../../../../Hooks/useGetTours";
import TotalPrice from "./TotalPrice";
import DatePicker from "./DatePicker";
import TicketTypes from "./TicketTypes/TicketTypes";
import Activity from "./Activity";
import Contact from "./Contact/Contact";

const BookTicket = () => {
  const { tourId } = useParams();
  const { tourData } = useGetTours();
  const singleBooking = tourData?.find((item) => item.id === tourId);

  return (
    <section className="bg-darkBlue">
      <Head shareHidden />
      <div className="roundedBg py-5 mt-[6rem]">
        <Screen>
          <Flex gap={5} flexDirection={{ base: "column-reverse", md: "row" }}>
            <div className="w-full md:w-[10rem] flex-[2.5] space-y-1">
              <Box as="div" className="secondBg round" w="100%">
                <h2
                  className="font-bold text-lg md:text-xl border-b border-dashed 
                  border-gray-300 pt-2 pb-4">
                  {singleBooking?.title}
                </h2>
                <DatePicker />
              </Box>
              <TicketTypes />
              <Activity />
              <Contact />
              <section className="secondBg rounded-md !top-[-1.7rem] space-y-4 !z-[30]">
                <div className="space-y-2">
                  <p className="text-[0.8rem]">
                    By proceeding, I acknowledge that I have read and agree to
                    Travel.com's
                    <span className="text-blue-500 ml-1">Terms of Use</span> and
                    <span className="text-blue-500 ml-1">
                      Privacy Statement
                    </span>
                    .
                  </p>
                  <Checkbox size="sm">
                    Send me special Trip.com deals and travel reminders
                  </Checkbox>
                </div>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  w="100%"
                  mt="1.5rem"
                  py="1.5rem">
                  Pay
                </Button>
              </section>
            </div>
            {/* side bare for total price  */}
            <div className="relative flex-[1]">
              <TotalPrice bookPrice={+singleBooking?.price} />
            </div>
          </Flex>
        </Screen>
      </div>
    </section>
  );
};

export default BookTicket;
