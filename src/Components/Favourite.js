import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useState } from "react";

export function Favourite() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setLiked(!liked);
        }}
      >
        <FavoriteIcon sx={{ color: liked ? "red" : "inherit" }} />
        {!liked ? "Like" : "Liked"}
      </Button>
    </>
  );
}
