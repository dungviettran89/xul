import { context } from "@xul/core";
import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import { Application } from "./components/Application";
import "./index.css";
context.initialize().then(r => {
  ReactDOM.render(<Application />, document.getElementById("root"));
});
