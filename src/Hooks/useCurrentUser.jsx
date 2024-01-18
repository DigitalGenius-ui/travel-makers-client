import { useState } from "react";

const useCurrentUser = () => {
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));

  return currentUser;
};

export default useCurrentUser;
