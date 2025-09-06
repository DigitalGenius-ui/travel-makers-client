import { useMemo, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import { useBookingContext } from "../../../../../../../context/BookingContext";
import TourType from "./TourType";

const TicketTypes = ({ bookPrice }: { bookPrice: number }) => {
  const { sortTitle } = useBookingContext();
  const [showMore, setShowMore] = useState(false);

  // sort components
  const sortedComponent = useMemo(() => {
    const components = [
      <TourType key={1} title={"adult"} />,
      <TourType key={2} title={"child"} />,
    ];
    return components.sort((a, b) => {
      const titleA = a.props.title;
      const titleB = b.props.title;

      const equal = titleA === sortTitle && titleB !== sortTitle;

      return equal ? -1 : !equal ? 1 : 0;
    });
  }, [sortTitle]);

  const renderedComp = sortedComponent.map((component, i) => (
    <div key={i}>{component}</div>
  ));

  const buttonTitle = !showMore ? `Show More ` : `Show Less `;

  const buttonIcon = !showMore ? (
    <IoIosArrowDropdown className="text-[1rem]" />
  ) : (
    <IoIosArrowDropup className="text-[1rem]" />
  );

  return (
    <section className="secondBg rounded-es-lg rounded-ee-lg">
      {renderedComp[0]}
      <div className="pt-[2rem]">
        {showMore ? (
          renderedComp[1]
        ) : (
          <p className="text-sm text-gray-700">
            <SlCalender className="inline-block mr-2 text-sm" />
            Add: {sortTitle === "adult" ? "Child" : "Adult"} Ticket
          </p>
        )}
      </div>
      <Button
        onClick={() => setShowMore((prev) => !prev)}
        mt="1rem"
        w="100%"
        size="sm"
        fontSize="0.8rem"
        colorScheme="blue"
        variant="outline"
        py="1.3rem"
        rightIcon={buttonIcon}
      >
        {buttonTitle}
      </Button>
    </section>
  );
};

export default TicketTypes;
