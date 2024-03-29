import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wrapper from "./Wrapper/Wrapper.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Wrapper>
          <App />
        </Wrapper>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
