import React, { createContext, useContext, useState } from "react";
const TravelMaker = createContext();

const BookingContext = ({ children }) => {
  const [sortTitle, setSortTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [contactCode, setContactCode] = useState("+1");
  const [bookForm, setBookForm] = useState({
    date: "",
    child: 0,
    adult: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    sendDeal: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <TravelMaker.Provider
      value={{
        sortTitle,
        setSortTitle,
        errorMsg,
        setErrorMsg,

        bookForm,
        setBookForm,
        contactCode,
        setContactCode,

        totalPrice,
        setTotalPrice,
      }}>
      {children}
    </TravelMaker.Provider>
  );
};

export default BookingContext;

export const useBookingContext = () => useContext(TravelMaker);
