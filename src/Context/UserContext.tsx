import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { USER_KEY } from "../constants/react-query";
import { getCurrentUser } from "../api-call/user-api";
import type { userMomentType, userWithProfileType } from "../types/user-type";

type userWithMoment = userWithProfileType & {
  moment: userMomentType[];
};

type contextType = {
  currentUser: userWithMoment;
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

  console.log(data);

  return (
    <UserAuth.Provider value={{ currentUser: data, isPending: isPending }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
