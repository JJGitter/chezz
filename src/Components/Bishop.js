import React from "react";
import "../App.css";
import { GiChessBishop } from "react-icons/gi";

function Bishop(bishopParams) {
  return (
    <div>
      <GiChessBishop fontSize={60} color={bishopParams.color}/>
    </div>
  );
}

export default Bishop;
