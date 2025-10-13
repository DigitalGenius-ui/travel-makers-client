import { GrDocumentText } from "react-icons/gr";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { BsTicketDetailed } from "react-icons/bs";
import React, { useCallback, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingContext } from "../../../../../context/BookingContext";
import Conditions from "../../Common/Condition";
import type { tourType } from "../../../../../types/tours-type";

type ticketType = {
  title: "adult" | "child";
  singleTour: tourType | undefined;
  tourTitle: string | undefined;
};

const Ticket = ({ title, singleTour, tourTitle }: ticketType) => {
  const { setSortTitle } = useBookingContext();
  const { id: tourId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const age = title === "adult" ? "16 and over" : "1 - 12 years old";
  const price: Record<"adult" | "child", number> = {
    adult: +(singleTour?.price ?? 0),
    child: +(singleTour?.price ?? 0) * (1 - 0.4),
  };

  const handleBook = useCallback(() => {
    setSortTitle(title);
    navigate(`/tour/book/${tourId}`);
  }, [tourId, title, navigate, setSortTitle]);

  return (
    <section
      className="flex md:items-center justify-between flex-col md:flex-row 
        border-t border-gray-400 py-4 gap-3"
    >
      <div>
        <h2 className="text-md font-bold pb-1 capitalize">{title} Ticket</h2>
        <p className="text-sm md:w-[14rem] lg:w-[20rem]">
          Age: {age} (
          {`Refers to travelers' ages on the date of travel. Age is
          calculated according to date of birth.`}
          )
        </p>
      </div>
      <div className="space-y-1">
        <Title
          className="text-blue-400"
          title="Ready to Use Immediately"
          icon={<GrDocumentText />}
        />
        <Title title="Non-refundable" icon={<RiMoneyCnyCircleLine />} />
        <Title
          title="Ticket Redemption Not Required"
          icon={<BsTicketDetailed />}
        />
        <button
          onClick={() => setShowModal(true)}
          className="text-sm hover:text-red-500 cursor-pointer"
        >
          41 Booked Booking | Information
        </button>
      </div>
      <div className="self-end md:self-start flex items-center gap-2">
        <h3 className="text-2xl font-bold">${price[title].toFixed(2)}</h3>
        <Button
          onClick={handleBook}
          variant="solid"
          colorScheme="blue"
          px="2rem"
        >
          Book
        </Button>
      </div>
      {showModal && (
        <Conditions
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          tourTitle={tourTitle}
        />
      )}
    </section>
  );
};

export default Ticket;

const Title = ({
  title,
  icon,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span>{icon}</span>
      <h3 className="text-sm">{title}</h3>
    </div>
  );
};
