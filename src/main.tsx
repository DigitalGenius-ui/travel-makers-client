import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient.js";
import Wrapper from "./Wrapper/Wrapper.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ChakraProvider>
        <Wrapper>
          <App />
        </Wrapper>
      </ChakraProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);
