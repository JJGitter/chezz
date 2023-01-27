import React from "react";
import "../App.css";
import { GiChessKnight } from "react-icons/gi";
import { GiChessPawn } from "react-icons/gi";
import { GiChessRook } from "react-icons/gi";
import { GiChessQueen } from "react-icons/gi";
import { GiChessBishop } from "react-icons/gi";
import { GiChessKing } from "react-icons/gi";

function Piece(pieceProps) {
  let pieceSize ="80%"; //size relative to the square
  if (pieceProps.pieceType === "") {
    return null;
  } else if (pieceProps.pieceType === "Pawn") {
    return <GiChessPawn style={{height:pieceSize, width: pieceSize}} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Rook") {
    return <GiChessRook style={{height:pieceSize, width: pieceSize}} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Knight") {
    return <GiChessKnight style={{height:pieceSize, width: pieceSize}} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "Bishop") {
    return <GiChessBishop style={{height:pieceSize, width: pieceSize}} color={pieceProps.pieceColor} />;
  } else if (pieceProps.pieceType === "King") {
    return <GiChessKing style={{height:pieceSize, width: pieceSize}} color={pieceProps.pieceColor} />;
  } else {
    return <GiChessQueen style={{height:pieceSize, width: pieceSize}} color={pieceProps.pieceColor} />;
  }
}

export default Piece;
