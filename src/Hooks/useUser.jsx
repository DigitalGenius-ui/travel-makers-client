import { getCurrentUser } from "../api-call/user-api";
import { USER_KEY } from "../constants/react-query";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data, isPending } = useQuery({
    queryKey: [USER_KEY],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  console.log(data);

  return {
    currentUser: data,
    isPending,
  };
};

export default useUser;
