import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [user]);

  return currentUser;
};

export default useCurrentUser;
