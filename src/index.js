import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Newuser from "./Components/Newuser";
ReactDOM.render(
  <Router>
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="dashboard" element={<App />} />
      <Route path="cartpage" element={<>hello</>} />
      <Route path="newUser" element={<Newuser />} />
      {/* <Route path="dashboard" element={<App />} /> */}
    </Routes>
  </Router>,
  document.getElementById("root")
);
