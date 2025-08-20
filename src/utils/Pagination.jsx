import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
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
    setCurrentPage(i);
  };

  const getTotalButtons = () => {
    let totalButtons = [];
    let maxBtns = 5;

    let startPage = Math.max(currentPage - Math.floor(maxBtns / 2), 1);
    let endPage = startPage + maxBtns - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxBtns + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      totalButtons.push(i);
    }

    return totalButtons;
  };

  useEffect(() => {
    getTotalButtons();
  }, []);

  return (
    <div className="space-x-2 pb-8 text-right">
      <Button
        isDisabled={currentPage === 1}
        onClick={decreasePage}
        size="sm"
        colorScheme="blue"
      >
        <IoIosArrowBack />
      </Button>
      {getTotalButtons().map((item) => (
        <Button
          key={`page-${item}`}
          onClick={() => selectPageNumber(item)}
          size="sm"
          colorScheme={currentPage === item ? "blue" : "gray"}
        >
          {item}
        </Button>
      ))}
      <Button
        isDisabled={currentPage === totalPages}
        onClick={increasePage}
        size="sm"
        colorScheme="blue"
      >
        <IoIosArrowForward />
      </Button>
    </div>
  );
};

export default Pagination;
