import React from "react";
import BookingContext from "../Context/BookingContext";
import UserContext from "../Context/UserContext";
import ScrollToTop from "../ScrollToTop";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => {
  return (
    <ScrollToTop>
      <BookingContext>
        <UserContext>
          <ToastContainer position="bottom-right" />
          {children}
        </UserContext>
      </BookingContext>
    </ScrollToTop>
  );
};

export default Wrapper;
