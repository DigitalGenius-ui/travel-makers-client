import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api-call/tour-api";
import { TOURS_KEY } from "../constants/react-query";
import useErrorToest from "./useErrorToest";

const useGetTours = (page?: number, limit?: number, cat?: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [TOURS_KEY, limit, page, cat],
    queryFn: () => getTours(limit!, page!, cat!),
  });

  useErrorToest({ error, isError });

  return {
    tourData: data,
    isPending,
  };
};

export default useGetTours;
