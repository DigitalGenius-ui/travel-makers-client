import { DASH_BOOKING_DATA } from "../constants/react-query";
import { useQuery } from "@tanstack/react-query";
import { bookingData } from "../api-call/dashboard-api";
import useErrorToest from "./useErrorToest";

const useGetBookingData = (filter?: string) => {
  const { data, isPending, error, isError } = useQuery({
    queryKey: [DASH_BOOKING_DATA, filter],
    queryFn: async () => await bookingData(filter),
  });

  useErrorToest({ error, isError });

  return {
    data,
    isPending,
  };
};

export default useGetBookingData;
