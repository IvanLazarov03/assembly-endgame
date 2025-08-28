import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Tenzies from "./tenzies.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tenzies" element={<Tenzies />} />
    </Routes>
  </BrowserRouter>
);
