import { Button } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  const decreasePage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increasePage = () => {
    setCurrentPage((prev) =>
      prev < totalPages ? prev + 1 : (prev = totalPages)
    );
  };

  const selectPageNumber = (i) => {
    setCurrentPage(i + 1);
  };

  return (
    <div className="space-x-2 pb-8 text-right">
      <Button
        isDisabled={currentPage === 1}
        onClick={decreasePage}
        size="sm"
        colorScheme="blue">
        <IoIosArrowBack />
      </Button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          onClick={() => selectPageNumber(i)}
          size="sm"
          colorScheme={currentPage === i + 1 ? "blue" : "gray"}>
          {i + 1}
        </Button>
      ))}
      <Button
        isDisabled={currentPage === totalPages}
        onClick={increasePage}
        size="sm"
        colorScheme="blue">
        <IoIosArrowForward />
      </Button>
    </div>
  );
};

export default Pagination;
