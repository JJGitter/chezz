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
  toSquare,
  wKingState,
  bKingState,
  setwKingState,
  setbKingState
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

    if (pieceType === "King") {
      //Remove castling rights if king moves
      if (pieceColor === "white") {
        setwKingState({
          ...wKingState,
          hasQSideCastlingRights: false,
          hasKSideCastlingRights: false,
        });
      } else {
        setbKingState({
          ...bKingState,
          hasQSideCastlingRights: false,
          hasKSideCastlingRights: false,
        });
      }

      if (pieceType === "Rook") {
        //Remove castling rights if rook moves
        if (fromSquare === "h1") {
          setwKingState({ ...wKingState, hasKSideCastlingRights: false });
        } else if (fromSquare === "a1") {
          setwKingState({ ...wKingState, hasQSideCastlingRights: false });
        } else if (fromSquare === "h8") {
          setbKingState({ ...bKingState, hasKSideCastlingRights: false });
        } else if (fromSquare === "a8") {
          setbKingState({ ...bKingState, hasQSideCastlingRights: false });
        }
      }

      if (Math.abs(toColumnIndex - fromColumnIndex) === 2) {
        //If king is castling, move rook
        if (toSquare === "g1") {
          //White castles kingside
          tempBoard[7][5] = (
            <Square
              key="f1"
              index="f1"
              color="Light"
              pieceType="Rook"
              pieceColor="white"
            />
          );
          tempBoard[7][7] = (
            <Square
              key="h1"
              index="h1"
              color="Light"
              pieceType=""
              pieceColor=""
            />
          );
        } else if (toSquare === "c1") {
          //White castles queenside
          tempBoard[7][3] = (
            <Square
              key="d1"
              index="d1"
              color="Light"
              pieceType="Rook"
              pieceColor="white"
            />
          );
          tempBoard[7][0] = (
            <Square
              key="a1"
              index="a1"
              color="Dark"
              pieceType=""
              pieceColor=""
            />
          );
        } else if (toSquare === "g8") {
          //Black castles kingside
          tempBoard[0][5] = (
            <Square
              key="f8"
              index="f8"
              color="Dark"
              pieceType="Rook"
              pieceColor="black"
            />
          );
          tempBoard[0][7] = (
            <Square
              key="h8"
              index="h8"
              color="Dark"
              pieceType=""
              pieceColor=""
            />
          );
        }else{
          //Black castles queenside
          tempBoard[0][3] = (
            <Square
              key="d8"
              index="d8"
              color="Dark"
              pieceType="Rook"
              pieceColor="black"
            />
          );
          tempBoard[0][0] = (
            <Square
              key="a8"
              index="a8"
              color="Light"
              pieceType=""
              pieceColor=""
            />
          );
        }
      }
    }

    tempBoard[toRowIndex][toColumnIndex] = (
      <Square
        key={toSquare}
        index={toSquare}
        color={board[toRowIndex][toColumnIndex].props.color}
        pieceType={pieceType}
        pieceColor={pieceColor}
      />
    );
  } else {
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
