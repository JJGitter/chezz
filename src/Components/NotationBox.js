import React from "react";
import "../App.css";
import NotationElements from "./NotationElements";

function NotationBox(moveHistory, player, nrOfFullMoves) {
  return <div className="NotationBox">{NotationElements(moveHistory, player, nrOfFullMoves)}</div>;
}

export default NotationBox;
