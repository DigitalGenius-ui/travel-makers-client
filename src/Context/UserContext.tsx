import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { USER_KEY } from "../constants/react-query";
import { getCurrentUser, type currentUserApi } from "../api-call/user-api";

type contextType = {
  currentUser: currentUserApi | undefined;
  isPending: boolean;
};

const UserAuth = createContext<contextType>({} as contextType);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useQuery({
    queryKey: [USER_KEY],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <UserAuth.Provider value={{ currentUser: data, isPending: isPending }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
