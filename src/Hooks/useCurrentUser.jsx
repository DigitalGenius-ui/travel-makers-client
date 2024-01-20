import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUserDetails } from "../FetchData/User/UserDetails";
import Loading from "../Loading";

const useCurrentUser = () => {
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));
  const id = currentUser?.id;

  // const { data, isPending } = useQuery({
  //   queryKey: ["users", id],
  //   queryFn: () => getUserDetails(id),
  // });

  // if (isPending) {
  //   return <Loading />;
  // }

  // console.log(data);

  return currentUser;
};

export default useCurrentUser;
