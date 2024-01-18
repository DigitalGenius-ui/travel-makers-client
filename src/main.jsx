import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookingContext from "./Context/BookingContext.jsx";
// import "./Intercepter/axiosIntercepter.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookingContext>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </BookingContext>
    </BrowserRouter>
  </React.StrictMode>
);
