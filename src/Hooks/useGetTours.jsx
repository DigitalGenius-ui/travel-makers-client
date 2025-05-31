import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Loading";
import ErrorApi from "../utils/ErrorApi";
import { getTours } from "../api-call/tour-api";

const useGetTours = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorApi errorText={error.message} />;
  }

  return {
    tourData: data?.data?.getTours,
  };
};

export default useGetTours;
