import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import navbarStyle from "./Navbar.module.css";

export function Navbar({ name = "Test Default" }) {
  const navigate = useNavigate();
  console.log("in nav", name);
  return (
    <>
      <div className={navbarStyle.nav}>
        <div className={navbarStyle.wel}>
          <a>Welcome {name}</a>
        </div>
        <Button
          variant="contained"
          colorScheme="blue"
          className={navbarStyle.btn1}
          onClick={() => {
            navigate(
              "/dashboard",
              { state: { id: 1, name: name } },
              { replace: true }
            );
          }}
        >
          {" "}
          Menu{" "}
        </Button>
        <Button
          variant="contained"
          colorScheme="blue"
          className={navbarStyle.btn2}
          onClick={() => {
            navigate(
              "/cartpage",
              { state: { id: 1, name: name } },
              { replace: true }
            );
          }}
        >
          {" "}
          Cart{" "}
        </Button>

        <Button
          variant="contained"
          colorScheme="blue"
          className={navbarStyle.btn3}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          {" "}
          SignOut{" "}
        </Button>
      </div>
    </>
  );
}
