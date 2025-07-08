import React from "react";

const useDebounce = () => {
  const debounce = (func, delay) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  return debounce;
};

export default useDebounce;
