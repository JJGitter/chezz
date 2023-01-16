import React from "react";
import "../App.css";
import { GiChessKnight } from "react-icons/gi";
import { GiChessPawn } from "react-icons/gi";
import { GiChessRook } from "react-icons/gi";
import { GiChessQueen } from "react-icons/gi";
import { GiChessBishop } from "react-icons/gi";
import { GiChessKing } from "react-icons/gi";

function Piece(pieceProps) {
  if (pieceProps.pieceType === "") {
    return null;
  } else if (pieceProps.pieceType === "Pawn") {
    return <GiChessPawn fontSize={57} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Rook") {
    return <GiChessRook fontSize={57} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Knight") {
    return <GiChessKnight fontSize={57} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Bishop") {
    return <GiChessBishop fontSize={57} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "King") {
    return <GiChessKing fontSize={57} color={pieceProps.pieceColor} />;
  } else {
    return <GiChessQueen fontSize={57} color={pieceProps.pieceColor} />;
  }
}

export default Piece;
