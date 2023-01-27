import React from "react";
import Square from "../Components/Square";
import { stringMerge } from "./DestinationSquares";
import UnderEnemyControl from "./UnderEnemyControl";

export function stringSplit(string) {
  //This function will split the string of square id such as "C4" and return columnindex=2 and rowindex=4
  const [column, row] = string.split("");

  const columnIndex = column.charCodeAt(0) - 97; //Translate column from letter to digit
  const rowIndex = 8 - row; //Translate row because the array counts the top row of the board as row 0
  return [columnIndex, rowIndex];
}

let lastMoveHighlight = "grayscale(50%)";

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
  setbKingState,
  enPassantTarget,
  player,
  wChecked,
  bChecked,
  lastMove,
  setLastMove
) {
  enPassantTarget.current = ""; //reset the enPassanttarget every time a new piece is moved
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
      lastMoveHighlight={lastMoveHighlight}
    />
  );

  //add enPassant target
  if (pieceType === "Pawn" && Math.abs(toRowIndex - fromRowIndex) === 2) {
    //set target to the square behind the pawn
    enPassantTarget.current = stringMerge(
      toColumnIndex,
      Math.min(fromRowIndex, toRowIndex) + 1
    );
  }

  //if enPassant is performed, remove the captured pawn
  if (toSquare === enPassantTarget && pieceType === "Pawn") {
    tempBoard[fromRowIndex][toColumnIndex] = (
      <Square
        key={board[fromRowIndex][toColumnIndex].props.index}
        index={board[fromRowIndex][toColumnIndex].props.index}
        color={board[fromRowIndex][toColumnIndex].props.color}
        pieceType=""
        pieceColor=""
      />
    );
  }

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
          position: toSquare,
        });
      } else {
        setbKingState({
          ...bKingState,
          hasQSideCastlingRights: false,
          hasKSideCastlingRights: false,
          position: toSquare,
        });
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
        } else {
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

    //set piece on the dropped square
    tempBoard[toRowIndex][toColumnIndex] = (
      <Square
        key={toSquare}
        index={toSquare}
        color={board[toRowIndex][toColumnIndex].props.color}
        pieceType={pieceType}
        pieceColor={pieceColor}
        lastMoveHighlight={lastMoveHighlight}
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
        lastMoveHighlight={lastMoveHighlight}
      />
    );
  }

  //Handle check
  //_____________________________________________
  //_____________________________________________
  if (player === "white") {
    if (wChecked) {
      wChecked.current = false; //if white moves, he removes the check

      if (pieceType !== "King") {
        //if white blocks the check, remove the check indication on the king square
        let [colidx, rowidx] = stringSplit(wKingState.position);
        tempBoard[rowidx][colidx] = (
          <Square
            key={wKingState.position}
            index={wKingState.position}
            color={board[rowidx][colidx].props.color}
            pieceType="King"
            pieceColor="white"
          />
        );
      }
    }

    if (UnderEnemyControl(board, "black").includes(bKingState.position)) {
      //if the black king position is targeted by white
      bChecked.current = true;
      let [colidx, rowidx] = stringSplit(bKingState.position);
      tempBoard[rowidx][colidx] = (
        <Square
          key={bKingState.position}
          index={bKingState.position}
          color={board[rowidx][colidx].props.color}
          pieceType="King"
          pieceColor="black"
          rotate="20deg" //tilt to show that king is in check
        />
      );
    }
  } else if (player === "black") {
    if (bChecked) {
      bChecked.current = false; //if black moves, he removes the check
      if (pieceType !== "King") {
        //if black blocks the check, remove the check indication on the king square
        let [colidx, rowidx] = stringSplit(bKingState.position);
        tempBoard[rowidx][colidx] = (
          <Square
            key={bKingState.position}
            index={bKingState.position}
            color={board[rowidx][colidx].props.color}
            pieceType="King"
            pieceColor="black"
          />
        );
      }
    }
    if (UnderEnemyControl(board, "white").includes(wKingState.position)) {
      //if the white king position is targeted by black
      wChecked.current = true;
      let [colidx, rowidx] = stringSplit(wKingState.position);
      tempBoard[rowidx][colidx] = (
        <Square
          key={wKingState.position}
          index={wKingState.position}
          color={board[rowidx][colidx].props.color}
          pieceType="King"
          pieceColor="white"
          rotate="20deg" //20deg tilt to show that king is in check
        />
      );
    }
  }
  //Handle check
  //_____________________________________________
  //_____________________________________________

  //Remove the highlight on the last move
  //_____________________________________________
  //_____________________________________________

  if (lastMove.from !== "") {
    let [lastFromCol, lastFromRow] = stringSplit(lastMove.from);
    let [lastToCol, lastToRow] = stringSplit(lastMove.to);
    tempBoard[lastFromRow][lastFromCol] = (
      <Square
        key={tempBoard[lastFromRow][lastFromCol].props.index}
        index={tempBoard[lastFromRow][lastFromCol].props.index}
        color={tempBoard[lastFromRow][lastFromCol].props.color}
        pieceType={tempBoard[lastFromRow][lastFromCol].props.pieceType}
        pieceColor={tempBoard[lastFromRow][lastFromCol].props.pieceColor}
        rotate={tempBoard[lastFromRow][lastFromCol].props.rotate}
      />
    );
    tempBoard[lastToRow][lastToCol] = (
      <Square
        key={tempBoard[lastToRow][lastToCol].props.index}
        index={tempBoard[lastToRow][lastToCol].props.index}
        color={tempBoard[lastToRow][lastToCol].props.color}
        pieceType={tempBoard[lastToRow][lastToCol].props.pieceType}
        pieceColor={tempBoard[lastToRow][lastToCol].props.pieceColor}
        rotate={tempBoard[lastToRow][lastToCol].props.rotate}
      />
    );
  }
  setLastMove({ from: fromSquare, to: toSquare }); //update the lastmove (used to visualize the last move on the board)
  //Remove the highlight on the last move
  //_____________________________________________
  //_____________________________________________

  //Update the board state
  setBoard(tempBoard);
}

export default MovePiece;
