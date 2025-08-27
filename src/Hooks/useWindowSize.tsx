import React, { useEffect } from "react";
import useDebounce from "./useDebounce";

type windowType = {
  width: number;
  height: number;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<windowType>(
    {} as windowType
  );
  const debounce = useDebounce();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
    };

    handleResize();

    window.addEventListener("resize", debounce(handleResize, 100));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width: windowSize.width || 0,
    height: windowSize.height || 0,
  };
};

export default useWindowSize;
