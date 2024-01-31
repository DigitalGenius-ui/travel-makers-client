import React from "react";
import BookingContext from "../Context/BookingContext";
import UserContext from "../Context/UserContext";
import ScrollToTop from "../ScrollToTop";

const Wrapper = ({ children }) => {
  return (
    <ScrollToTop>
      <BookingContext>
        <UserContext>{children}</UserContext>
      </BookingContext>
    </ScrollToTop>
  );
};

export default Wrapper;
