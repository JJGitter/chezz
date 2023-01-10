import React from "react";
import Square from "./Square";

function stringSplit(string) {
  const [column, row] = string.split("");

  const columnIndex = column.charCodeAt(0) - 97;
  const rowIndex = 8 - row;

  return [columnIndex, rowIndex];
}

function MovePiece(
  board,
  setBoard,
  pieceType,
  pieceColor,
  fromSquare,
  toSquare
) {
  const fromSquareTest = "b1";
  const toSquareTest = "c3";

  const [fromColumnIndex, fromRowIndex] = stringSplit(fromSquareTest);
  const [toColumnIndex, toRowIndex] = stringSplit(toSquareTest);

  let tempBoard = [...board];

  tempBoard[fromRowIndex][fromColumnIndex] = (
    <Square
      key={fromSquareTest}
      index={fromSquareTest}
      color={board[fromRowIndex][fromColumnIndex].props.color}
      pieceType=""
      pieceColor=""
    />
  );

  tempBoard[toRowIndex][toColumnIndex] = (
    <Square
      key={toSquareTest}
      index={toSquareTest}
      color={board[toRowIndex][toColumnIndex].props.color}
      pieceType="Knight"
      pieceColor="white"
    />
  );
  setBoard(tempBoard);
}

export default MovePiece;
