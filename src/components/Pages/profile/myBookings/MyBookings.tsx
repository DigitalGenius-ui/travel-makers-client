import { useState } from "react";
import EmptyBook from "./EmptyBook";
import TicketCard from "./TicketCard";
import Pagination from "../../../../utils/Pagination";
import { useQuery } from "@tanstack/react-query";
import { BOOKING_KEYS } from "../../../../constants/react-query";
import { getBooking } from "../../../../api-call/user-api";
import { BookingLoading } from "../../../../utils/Loadings";

const MyBookings = () => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  const { data, isPending } = useQuery({
    queryKey: [BOOKING_KEYS, currentPage, limit],
    queryFn: async () => await getBooking(currentPage, limit),
  });

  return (
    <section className="space-y-5 py-4 px-3 md:pr-3">
      <h3 className="text-xl font-bold pb-3">My Bookings :</h3>
      <div className="grid grid-cols-resCol tablet:flex flex-col flex-wrap gap-3">
        {isPending ? (
          <BookingLoading />
        ) : data?.bookings.length === 0 ? (
          <EmptyBook />
        ) : (
          data?.bookings.map((book: any) => (
            <TicketCard key={book.id} book={book} />
          ))
        )}
      </div>
      {data?.totalPages > 1 && (
        <Pagination
          totalPages={data?.totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </section>
  );
};

export default MyBookings;
