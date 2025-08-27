const useDebounce = () => {
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timer: any;

    return function (...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  return debounce;
};

export default useDebounce;
