import { Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

const btn = ["all", "latest"];

const Filter = ({ reviews, setAllReviews }) => {
  const [active, setActive] = useState("all");

  const handleFilter = (item) => {
    setActive(item);
    if (item === "all") {
      return setAllReviews(reviews);
    } else if (item === "latest") {
      const latestReview = reviews?.filter(
        (item) =>
          new Date(item.createAt) >=
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
      setAllReviews(latestReview);
      return;
    }
  };
  return (
    <HStack spacing={2} className="mt-[2rem]">
      {btn.map((item, i) => (
        <Button
          onClick={() => handleFilter(item)}
          colorScheme={item === active ? "blue" : "gray"}
          textTransform="capitalize"
          size="sm"
          key={i}
        >
          {item}
        </Button>
      ))}
    </HStack>
  );
};

export default Filter;
