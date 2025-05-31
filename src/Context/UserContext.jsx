import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getCurrentUser } from "../api-call/user-api";
import { USER_KEY } from "../constants/react-query";

const UserAuth = createContext();

const UserContext = ({ children }) => {
  const { data, isPending } = useQuery({
    queryKey: [USER_KEY],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  console.log(data);

  return (
    <UserAuth.Provider value={{ currentUser: data, isPending }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
