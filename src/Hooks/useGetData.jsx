import { useQuery } from "@tanstack/react-query";
import React from "react";
import ErrorApi from "../utils/ErrorApi";
import Loading from "../Loading";

const useGetData = ({ key, func }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [key],
    queryFn: func,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorApi errorText={error.message} />;
  }
  return {
    response: data?.data,
  };
};

export default useGetData;
