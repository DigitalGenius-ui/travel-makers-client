import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api-call/tour-api";
import { TOURS_KEY } from "../constants/react-query";
import useErrorToest from "./useErrorToest";

const useGetTours = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [TOURS_KEY],
    queryFn: getTours,
  });

  useErrorToest({ error, isError });

  return {
    tourData: data,
    isPending,
  };
};

export default useGetTours;
