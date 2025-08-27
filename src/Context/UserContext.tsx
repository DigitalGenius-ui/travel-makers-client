import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { USER_KEY } from "../constants/react-query";
import { getCurrentUser } from "../api-call/user-api";

type contextType = {
  currentUser: any;
  isPending: boolean;
};
const UserAuth = createContext<contextType>({} as contextType);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useQuery<any>({
    queryKey: [USER_KEY],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <UserAuth.Provider
      value={{ currentUser: data?.user, isPending: isPending }}
    >
      {children}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
