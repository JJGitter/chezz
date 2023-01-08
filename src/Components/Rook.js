import React from "react";
import "../App.css";
import { GiChessRook } from "react-icons/gi";

function Rook(rookParams) {
  return (
    <div>
      <GiChessRook fontSize={60} color={rookParams.color}/>
    </div>
  );
}

export default Rook;
