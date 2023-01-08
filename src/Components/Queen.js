import React from "react";
import "../App.css";
import { GiChessQueen } from "react-icons/gi";

function Queen(queenParams) {
  return (
    <div>
      <GiChessQueen fontSize={60} color={queenParams.color}/>
    </div>
  );
}

export default Queen;
