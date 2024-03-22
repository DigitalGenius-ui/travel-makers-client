import { useState, useEffect } from "react";

const useHeaderScroll = () => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [changeBg, setChangeBg] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (prevScroll > 30 && currentScroll > prevScroll) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }

      if (prevScroll > 30) {
        setChangeBg(true);
      } else {
        setChangeBg(false);
      }

      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll, setIsScroll, setChangeBg, setPrevScroll]);

  return {
    isScroll,
    changeBg,
  };
};

export default useHeaderScroll;
