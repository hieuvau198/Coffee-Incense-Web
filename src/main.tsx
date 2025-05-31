// src/main.tsx

import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import "./app/styles/override.css";
import App from "./App";
import { AuthProvider } from "./app/context/AuthContext"; // Make sure path matches your structure

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
