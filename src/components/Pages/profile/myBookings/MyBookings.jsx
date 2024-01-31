import { Button, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCurrentUser } from "../../../../Context/UserContext";
import EmptyBook from "./EmptyBook";
import Bookings from "./Bookings";
import Pagination from "../../../../utils/Pagination";

const MyBookings = () => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useCurrentUser();
  const bookings = currentUser?.bookings;

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(bookings?.length / itemsPerPage);

  const newBooking = bookings?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="space-y-5">
      <h3 className="text-xl font-bold pb-3">My Bookings :</h3>
      <div className="grid grid-cols-resCol tablet:flex flex-col flex-wrap gap-3">
        {!bookings ? (
          <EmptyBook />
        ) : (
          newBooking.map((book) => <Bookings key={book.id} book={book} />)
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </section>
  );
};

export default MyBookings;
