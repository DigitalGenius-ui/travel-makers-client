import { useQuery } from "@tanstack/react-query";
import { TICKETS_KEYS } from "../constants/react-query";
import { getUserTickets } from "../api-call/user-api";

const useTicketsData = (
  limit: number,
  page: number,
  search: string = "",
  select: string = ""
) => {
  const { data, isPending, isFetching } = useQuery({
    queryKey: [TICKETS_KEYS, page, limit, search, select],
    queryFn: async () => await getUserTickets(page, limit, search, select),
    placeholderData: (previousData) => previousData,
  });

  return {
    data,
    isPending,
    isFetching,
  };
};

export default useTicketsData;
