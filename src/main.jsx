import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { NotesContextProvider } from "./context/NotesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
