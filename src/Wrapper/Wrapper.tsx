import React from "react";
import BookingContext from "../context/BookingContext";
import UserContext from "../context/UserContext";
import ScrollToTop from "../ScrollToTop";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
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
