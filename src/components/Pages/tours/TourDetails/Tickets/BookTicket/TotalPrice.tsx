import { Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useBookingContext } from "../../../../../../Context/BookingContext";

const TotalPrice = ({
  bookPrice,
  ticketTitle,
}: {
  bookPrice: number;
  ticketTitle: string;
}) => {
  const {
    sortTitle,
    bookForm: count,
    setTotalPrice,
    totalPrice,
  } = useBookingContext();

  const childPrice = bookPrice * (1 - 0.4);

  const sortedPrice = useMemo(() => {
    // storing and sorting child and adult tickets
    const pricesCom = [
      <Prices
        key={"adult"}
        title="adult"
        price={`${bookPrice}x${count.adult}`}
      />,
      <Prices
        key={"child"}
        title="child"
        price={`${childPrice.toFixed(2)}x${count.child}`}
      />,
    ];
    return pricesCom.sort((a, b) => {
      const aTitle = a.props.title;
      const bTitle = b.props.title;

      const isEqual = aTitle === sortTitle && bTitle !== sortTitle;
      return isEqual ? -1 : !isEqual ? 1 : 0;
    });
  }, [sortTitle, bookPrice, childPrice, count.adult, count.child]);

  // getting adult and child total prices
  let adultTotal = bookPrice * count.adult;
  let childTotal = childPrice * count.child;

  // set the total price for global state
  useEffect(() => {
    const total = (adultTotal += childTotal).toFixed(2);
    setTotalPrice(+total);
  }, [adultTotal, childTotal]);

  return (
    <section className="secondBg rounded-lg h-fit lg:!sticky lg:mt-[-3rem] lg:!top-[10rem]">
      <h2 className="pb-3 border-b border-dashed border-gray-500 text-md font-bold">
        Payment Details
      </h2>
      <div className="space-y-1 mt-3">
        <Prices key={1} title="Booking Total" price={totalPrice} />
        <Prices key={2} title={ticketTitle} price={bookPrice} />

        {sortedPrice.map((comp) => {
          const title = comp.props.title;
          return (
            <div className={count[title] <= 0 ? "hidden" : "block"} key={title}>
              {comp}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TotalPrice;

const Prices = ({
  title,
  price,
}: {
  title: string;
  price: string | number;
}) => {
  return (
    <Flex justifyContent="space-between" fontSize="0.9rem">
      <p className="capitalize line-clamp-1">{title} ticket</p>
      <p>${price}</p>
    </Flex>
  );
};
