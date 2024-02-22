import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import { BuddizProvider } from "./contexts/buddizContexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BuddizProvider defaultValue={"ko"}>
    <Main />
  </BuddizProvider>
);
