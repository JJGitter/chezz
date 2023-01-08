import React from "react";
import "../App.css";
import { GiChessKing } from "react-icons/gi";

function King(kingParams) {
  return (
    <div>
      <GiChessKing fontSize={60} color={kingParams.color}/>
    </div>
  );
}

export default King;
