import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { PrimeReactProvider } from "primereact/api";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PrimeReactProvider >
        <App />
      </PrimeReactProvider>
    </AuthProvider>
  </BrowserRouter>
);
