import { getAllUserProps, getAllUsers } from "../api-call/user-api";
import { useQuery } from "@tanstack/react-query";
import { USERS_KEYS } from "../constants/react-query";

//todo

const useGetAllUsers = ({
  page,
  limit,
  type,
  search = "",
}: getAllUserProps) => {
  const { data, isPending, isFetching } = useQuery({
    queryKey: [USERS_KEYS, page, limit, type, search],
    queryFn: async () => await getAllUsers({ page, limit, type, search }),
    placeholderData: (previousData) => previousData,
  });
  console.log(data);

  return {
    data,
    isPending,
    isFetching,
  };
};

export default useGetAllUsers;
