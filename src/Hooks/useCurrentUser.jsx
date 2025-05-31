import React from "react";
import { USER_KEY } from "../constants/react-query";
import { getCurrentUser } from "../api-call/user-api";
import { useQuery } from "@tanstack/react-query";

const useCurrentUsers = () => {
  const { data, isPending } = useQuery({
    queryKey: [USER_KEY],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return {
    currentUser: data,
    isPending,
  };
};

export default useCurrentUsers;
