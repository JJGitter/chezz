import React from "react";
import "../App.css";
import { GiChessPawn } from "react-icons/gi";

function Pawn(pawnParams) {
  return (
    <div>
      <GiChessPawn fontSize={60} color={pawnParams.color}/>
    </div>
  );
}

export default Pawn;
