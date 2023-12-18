import { createRoot } from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

const root = createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
