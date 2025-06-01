import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { USER_KEY } from "../constants/react-query";
import { API } from "../config/ApiClient";

const UserAuth = createContext();

const UserContext = ({ children }) => {
  const { data, isPending } = useQuery({
    queryKey: [USER_KEY],
    queryFn: async () => {
      try {
        const res = await API.get(`/user`);
        return res;
      } catch (error) {
        throw error;
      }
    },
    staleTime: Infinity,
  });

  return (
    <UserAuth.Provider value={{ currentUser: data, isPending }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
