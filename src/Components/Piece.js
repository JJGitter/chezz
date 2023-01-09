import React from "react";
import "../App.css";
import Pawn from "./Pawn";
import Rook from "./Rook";
import Knight from "./Knight";
import Bishop from "./Bishop";
import King from "./King";
import Queen from "./Queen";

function Piece(pieceProps) {

  if (pieceProps.pieceType === "") {
    return null;
  } else if (pieceProps.pieceType === "Pawn") {
    return <Pawn color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Rook") {
    return <Rook color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Knight") {
    return <Knight color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Bishop") {
    return <Bishop color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "King") {
    return <King color={pieceProps.pieceColor} />;
  } else {
    return <Queen color={pieceProps.pieceColor} />;
  }
}

export default Piece;
