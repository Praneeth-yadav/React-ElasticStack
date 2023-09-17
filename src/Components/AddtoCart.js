import React from "react";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function AddtoCart({ item }) {
  const addtocart_handleclick = () => {
    console.log("clicked =", item);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={addtocart_handleclick}
        disabled={item.out_of_stock.raw == "true"}
      >
        <ShoppingCartIcon />
        Add to Cart
      </Button>
    </>
  );
}
