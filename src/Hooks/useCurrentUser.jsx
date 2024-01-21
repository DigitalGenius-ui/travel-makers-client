import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserDetails } from "../FetchData/User/UserDetails";

const useCurrentUser = () => {
  const [userDetails, setUserDetails] = useState("");
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));
  const id = currentUser?.id;

  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (id) {
        const res = await getUserDetails(id);
        return res;
      }
      return null;
    },
  });

  // i am doing this because the data will lost if i refresh the page.
  //in protected route when the data is loading the route would be closed because the data is not available.

  useEffect(() => {
    if (!isPending) {
      setUserDetails(data?.data?.user);
    }
  }, [isPending, data]);

  return {
    currentUser,
    isPending,
    userDetails,
  };
};

export default useCurrentUser;
