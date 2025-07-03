// Main, used to wraap app with context providers

// React
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Context providers
import LangProvider from "./contexts/LangContext";

// Components
import App from "./App.jsx";

// Styles
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LangProvider>
      <App />
    </LangProvider>
  </BrowserRouter>
);
