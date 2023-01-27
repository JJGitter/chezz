import React, { useEffect } from "react";
import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import MovePiece from "../Functions/MovePiece";
import { boardContext } from "../App";
import { useContext } from "react";
import DestinationSquares from "../Functions/DestinationSquares";
import Checkmate from "../Functions/Checkmate";

function Square(squareProps) {
  //This function component will return a square with a Piece (the Piece can be empty) inside of it.
  //The piece will be draggable and the square will be able to accept dropped pieces.

  const {
    board,
    setBoard,
    player,
    setPlayer,
    wKingState,
    bKingState,
    setwKingState,
    setbKingState,
    enPassantTarget,
    wChecked,
    bChecked,
    checkmate,
    lastMove,
  } = useContext(boardContext);

  const [dragProps, dragRef] = useDrag({
    type: "piece",
    item: {
      fromCell: squareProps.index, //i.e. "c5"
      piece: squareProps.pieceType, //i.e. "Knight"
      pieceColor: squareProps.pieceColor,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }), //Collects isDragging into dragProps
  });

  const [, dropRef] = useDrop({
    accept: "piece", //the type of drag component that will be accepted to drop
    drop: (item, monitor) => {
      if (
        DestinationSquares(
          item,
          board,
          wKingState,
          bKingState,
          enPassantTarget
        ).includes(squareProps.index)
      ) {
        MovePiece(
          board,
          setBoard,
          item.piece,
          item.pieceColor,
          item.fromCell,
          squareProps.index,
          wKingState,
          bKingState,
          setwKingState,
          setbKingState,
          enPassantTarget,
          player,
          wChecked,
          bChecked,
          lastMove,
        );

        if (Checkmate(player, board, wKingState, bKingState, enPassantTarget)) {
          // stuff.current = "stuff was updated"
          if (wChecked || bChecked) {
            checkmate.current = true;
          } else {
            console.log("STALEMATE");
          }
        }

        setPlayer(player === "white" ? "black" : "white");
      }
    },
  });

  return (
    <div
      ref={dropRef} //This component will be able to accept dragged items corresponding to dropRef
      className={squareProps.color + "Square"}
      style={{ filter: squareProps.lastMoveHighlight }}
    >
      <div
        ref={
          squareProps.pieceColor === player && checkmate.current === false
            ? dragRef
            : null
        } //This component will be dragable if it is that colors turn.
        className="PieceContainer"
        style={{ rotate: squareProps.rotate }}
      >
        <Piece
          pieceType={squareProps.pieceType}
          pieceColor={dragProps.isDragging ? "grey" : squareProps.pieceColor}
          squareIndex={squareProps.index}
        />
      </div>
    </div>
  );
}

export default Square;
