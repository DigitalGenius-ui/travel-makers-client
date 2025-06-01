import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api-call/tour-api";
import { TOURS_KEY } from "../constants/react-query";

const useGetTours = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [TOURS_KEY],
    queryFn: getTours,
  });

  return {
    tourData: data,
    isPending,
    isError,
    error,
  };
};

export default useGetTours;
