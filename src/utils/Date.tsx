import { formatDistanceToNow, parse } from "date-fns";

export const parsDateHandler = (date: Date) => {
  // convet date
  const year = new Date().getFullYear();
  const parsDate = parse(`${date} ${year}`, "EEE, MMM dd yyyy", new Date());

  return {
    parsDate,
  };
};

export const dateEgoFormatter = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};
