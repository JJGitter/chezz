import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import MovePiece from "../Functions/MovePiece";
import { boardContext } from "../App";
import { useContext } from "react";
import DestinationSquares from "../Functions/DestinationSquares";
import CreateMoveNotation from "../Functions/CreateMoveNotation";

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
    enPassantTarget,
    wChecked,
    bChecked,
    checkmate,
    lastMove,
    draw,
    nrOfHalfMoves,
    nrOfFullMoves,
    moveHistory,
    boardHistory,
    whiteTimerOn,
    setWhiteTimerOn,
    blackTimerOn,
    setBlackTimerOn,
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

  const [dropProps, dropRef] = useDrop({
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
        let isCapture = MovePiece(
          board,
          setBoard,
          item.piece,
          item.pieceColor,
          item.fromCell,
          squareProps.index,
          wKingState,
          bKingState,
          enPassantTarget,
          player,
          wChecked,
          bChecked,
          lastMove,
          nrOfHalfMoves,
          checkmate,
          draw,
          boardHistory
        );

        if (player === "black") {
          nrOfFullMoves.current++;
        }

        CreateMoveNotation(
          board,
          item,
          isCapture,
          wChecked,
          bChecked,
          squareProps.index,
          wKingState,
          bKingState,
          enPassantTarget,
          moveHistory,
          checkmate
        );

        setPlayer(player === "white" ? "black" : "white");
        setWhiteTimerOn(!whiteTimerOn);
        setBlackTimerOn(!blackTimerOn);
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }), //Collects isOver into dropProps
  });

  return (
    <div
      ref={dropRef} //This component will be able to accept dragged items corresponding to dropRef
      className={squareProps.color + "Square"}
      style={
        dropProps.isOver
          ? { filter: "drop-shadow(0 0 1.5rem blue)" }
          : { filter: squareProps.lastMoveHighlight }
      }
    >
      <div
        ref={
          squareProps.pieceColor === player &&
          checkmate.current === false &&
          draw.current === false
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
