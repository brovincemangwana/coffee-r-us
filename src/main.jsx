import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CoffeeProvider from "./context/CoffeeProvider.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CoffeeProvider>
        <App />
      </CoffeeProvider>
    </BrowserRouter>
  </StrictMode>
);