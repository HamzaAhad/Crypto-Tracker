import { createRoot } from "react-dom/client";
import "react-alice-carousel/lib/alice-carousel.css";
// import React from "react";
import App from "./App";
// import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
