import React, { createContext, useContext, useState } from "react";

const TravelMaker = createContext();

const BookingContext = ({ children }) => {
  const [sortTitle, setSortTitle] = useState("");
  const [bookingCount, setBookingCount] = useState({
    child: 0,
    adult: 0,
  });

  const [date, setDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <TravelMaker.Provider
      value={{
        setBookingCount,
        bookingCount,
        date,
        setDate,
        sortTitle,
        setSortTitle,
        errorMsg,
        setErrorMsg,
      }}>
      {children}
    </TravelMaker.Provider>
  );
};

export default BookingContext;

export const useBookingContext = () => useContext(TravelMaker);
