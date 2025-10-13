import { useQuery } from "@tanstack/react-query";
import useErrorToest from "./useErrorToest";

const useGetData = <TData, tVariable>({
  key,
  func,
  variables,
}: {
  key: string;
  func: (tVariable: tVariable) => Promise<TData>;
  variables?: tVariable;
}) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [key, variables],
    queryFn: () => func(variables!),
  });

  useErrorToest({ isError, error });

  return { data, isPending };
};

export default useGetData;
