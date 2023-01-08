import React from "react";
import "../App.css";
import Pawn from "./Pawn";
import Rook from "./Rook";
import Knight from "./Knight";
import Bishop from "./Bishop";
import King from "./King";
import Queen from "./Queen";


function Piece(pieceParams) {
  if (pieceParams.pieceType === "") {
    return (
        null
    );
  }else if (pieceParams.pieceType === "Pawn") {
    return (
        <Pawn color={pieceParams.pieceColor}/>
    );
  }else if (pieceParams.pieceType === "Rook") {
    return (
        <Rook color={pieceParams.pieceColor}/>
    )
  }else if (pieceParams.pieceType === "Knight") {
    return (
        <Knight color={pieceParams.pieceColor}/>
    )
  }
  else if (pieceParams.pieceType === "Bishop") {
    return (
        <Bishop color={pieceParams.pieceColor}/>
    )
  }
  else if (pieceParams.pieceType === "King") {
    return (
        <King color={pieceParams.pieceColor}/>
    )
  }
  else {
    return (
        <Queen color={pieceParams.pieceColor}/>
    )
  }
}

export default Piece;
