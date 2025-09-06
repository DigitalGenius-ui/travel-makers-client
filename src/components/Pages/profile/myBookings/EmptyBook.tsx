import { Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EmptyBook = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center flex-col sm:flex-row spaces">
      <Image
        className="h-[13rem] w-[13rem] object-cover"
        src="/waiting.gif"
        alt="waiting-passenger"
      />
      <div className="space-y-5">
        <h3 className="font-bold text-black/70">
          {`You don't have any bookings or we can't access your bookings at this
          time. You can search for bookings you made as a guest within the last
          year using your email address.`}
        </h3>
        <Button
          onClick={() => navigate("/allTours")}
          fontSize="sm"
          variant="solid"
          colorScheme="blue"
        >
          Search Booking
        </Button>
      </div>
    </div>
  );
};

export default EmptyBook;
