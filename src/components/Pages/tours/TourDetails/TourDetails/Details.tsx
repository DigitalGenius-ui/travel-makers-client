import { FaRegHeart } from "react-icons/fa6";
import Address from "./Address";
import Traveler from "./Traveler";
import { Button } from "@chakra-ui/react";
import Stars from "../../../../../utils/stars";

export type tourDetailsType = {
  tourDetails: {
    title: string;
    open_time: string;
    close_time: string;
    address: string;
    phone_number: string;
    reviews: any;
  };
};

const Details = ({ tourDetails }: tourDetailsType) => {
  const reviews = tourDetails?.reviews;

  return (
    <section className="p-5 flex flex-col md:flex-row gap-5">
      <div className="flex-[2.5]">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl font-bold capitalize">
            {tourDetails?.title}
          </h2>
          <span className="cursor-pointer">
            <FaRegHeart />
          </span>
        </div>
        <Stars review={tourDetails?.reviews?.length} />
        <Address tourDetails={tourDetails} />
        {reviews?.length > 0 && <Traveler reviews={reviews} />}
      </div>
      <div
        className="flex-1 bg-white shadow-xl h-fit p-5 border-t-4 
      border-blue-600 rounded-lg"
      >
        <a href="#ticket">
          <Button variant="solid" colorScheme="blue" w="100%" size="lg">
            View Tickets
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Details;
