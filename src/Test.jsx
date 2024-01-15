import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const Test = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  console.log(cookies);
  return <div className="bg-darkBlue pt-[8rem] text-white">Test</div>;
};

export default Test;
