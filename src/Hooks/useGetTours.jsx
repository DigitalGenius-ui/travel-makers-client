import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Loading";
import { getTours } from "../FetchData/Tours/Tours";

const useGetTours = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="w-full h-screen grid place-items-center">{error.message}</p>
    );
  }

  return {
    tourData: data?.data?.getTours,
  };
};

export default useGetTours;
