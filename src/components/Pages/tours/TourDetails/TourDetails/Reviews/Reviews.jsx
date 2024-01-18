import { Button, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Filter from "./Filter";
import Review from "./Review";
import { Link } from "react-router-dom";
import OutStanding from "../../../../../../utils/OutStanding";

const Reviews = ({ data }) => {
  const { title, tourId, reviews } = data;

  const ratingSum = reviews?.reduce((acc, item) => (acc += +item?.rating), 0);
  const ratingAverage = Math.round(ratingSum / reviews?.length);

  return (
    <section
      id="review"
      className="bg-white shadow-sm rounded-xl mt-[1rem] p-5">
      <Flex
        alignItems={{ base: "start", md: "center" }}
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
        mb="2rem">
        <h2 className="font-bold text-lg sm:text-xl">Reviews of {title}</h2>
        <Link to={`/tour/write/${tourId}`}>
          <Button
            variant="solid"
            colorScheme="blue"
            fontSize="sm"
            size="sm"
            leftIcon={<HiMiniPencilSquare />}>
            Write a Review
          </Button>
        </Link>
      </Flex>
      <HStack spacing={2} w="100%" pt="1.5rem" borderTop="1px solid gray">
        {reviews?.length > 0 && (
          <OutStanding fontSize="3xl" size="1.7rem" rating={+ratingAverage} />
        )}
        <p className="text-xl font-semibold">{+reviews?.length} Reviews</p>
      </HStack>
      <Filter />
      <div className="space-y-[2rem] py-[2rem]">
        {reviews?.length > 0 ? (
          reviews?.map((review) => <Review review={review} key={review.id} />)
        ) : (
          <p className="italic text-xs text-gray-500">
            This tour has no reviews
          </p>
        )}
      </div>
      pagination goes here
    </section>
  );
};

export default Reviews;
