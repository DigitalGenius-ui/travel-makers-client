import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TICKETS_KEYS } from "../constants/react-query";
import { getUserTickets } from "../api-call/user-api";

const useTicketsData = (limit = 8, page = 1) => {
  const { data, isPending } = useQuery({
    queryKey: [TICKETS_KEYS, page, limit],
    queryFn: async () => await getUserTickets(page, limit),
  });

  return {
    data,
    isPending,
  };
};

export default useTicketsData;
