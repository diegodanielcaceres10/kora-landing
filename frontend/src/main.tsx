import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/kora-roster/">
    <App />
  </BrowserRouter>,
);
