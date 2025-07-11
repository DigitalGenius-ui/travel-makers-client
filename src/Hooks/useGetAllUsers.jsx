import React from "react";
import { getAllUsers } from "../api-call/user-api";
import { useQuery } from "@tanstack/react-query";
import { USERS_KEYS } from "../constants/react-query";

const useGetAllUsers = ({ page = 1, limit = 8 }) => {
  const { data, isPending } = useQuery({
    queryKey: [USERS_KEYS, page, limit],
    queryFn: async () => await getAllUsers(page, limit),
    placeholderData: {
      keepPreviousData: true,
    },
  });

  return {
    data,
    isPending,
  };
};

export default useGetAllUsers;
