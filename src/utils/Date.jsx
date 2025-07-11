import { formatDistanceToNow, parse } from "date-fns";

export const parsDateHandler = (date) => {
  // convet date
  const year = new Date().getFullYear();
  const parsDate = parse(`${date} ${year}`, "EEE, MMM dd yyyy", new Date());

  return {
    parsDate,
  };
};

export const dateEgoFormatter = (date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};
