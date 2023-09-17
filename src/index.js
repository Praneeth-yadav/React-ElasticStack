import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import BrowserRouter

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="dashboard" element={<App />} />
      <Route path="cartpage" element={<>hello</>} />
      {/* <Route path="dashboard" element={<App />} /> */}
    </Routes>
  </Router>,
  document.getElementById("root")
);
