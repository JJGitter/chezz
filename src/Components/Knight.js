import React from "react";
import "../App.css";
import { GiChessKnight } from "react-icons/gi";

function Knight(knightParams) {
  return (
    <div>
      <GiChessKnight fontSize={60} color={knightParams.color}/>
    </div>
  );
}

export default Knight;
