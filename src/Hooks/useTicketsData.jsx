import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TICKETS_KEYS } from "../constants/react-query";
import { getUserTickets } from "../api-call/user-api";

const useTicketsData = (limit, page, search = "") => {
  const { data, isPending } = useQuery({
    queryKey: [TICKETS_KEYS, page, limit, search],
    queryFn: async () => await getUserTickets(page, limit, search),
    keepPreviousData: true,
  });

  return {
    data,
    isPending,
  };
};

export default useTicketsData;
