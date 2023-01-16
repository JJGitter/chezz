import React from "react";
import Square from "../Components/Square";

export function stringSplit(string) {
  //This function will split the string of square id such as "C4" and return columnindex=2 and rowindex=4
  const [column, row] = string.split("");

  const columnIndex = column.charCodeAt(0) - 97; //Translate column from letter to digit
  const rowIndex = 8 - row; //Translate row because the array counts the top row of the board as row 0
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
  const [fromColumnIndex, fromRowIndex] = stringSplit(fromSquare);
  const [toColumnIndex, toRowIndex] = stringSplit(toSquare);

  let tempBoard = [...board];

  //Insert an empty square where the piece moved from
  tempBoard[fromRowIndex][fromColumnIndex] = (
    <Square
      key={fromSquare}
      index={fromSquare}
      color={board[fromRowIndex][fromColumnIndex].props.color}
      pieceType=""
      pieceColor=""
    />
  );

  //Insert the piece where the piece moves to
  if (pieceType !== "Pawn" || (toRowIndex !== 0 && toRowIndex !== 7)) {
    //If no promotion
    tempBoard[toRowIndex][toColumnIndex] = (
      <Square
        key={toSquare}
        index={toSquare}
        color={board[toRowIndex][toColumnIndex].props.color}
        pieceType={pieceType}
        pieceColor={pieceColor}
      />
    );
  }else{
    //else promotion to Queen
    tempBoard[toRowIndex][toColumnIndex] = (
      <Square
        key={toSquare}
        index={toSquare}
        color={board[toRowIndex][toColumnIndex].props.color}
        pieceType="Queen"
        pieceColor={pieceColor}
      />
    );
  }

  //Update the board state
  setBoard(tempBoard);
}

export default MovePiece;
