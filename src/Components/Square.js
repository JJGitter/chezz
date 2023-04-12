import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { boardContext } from "./Game";
import { useContext } from "react";
import DestinationSquares from "../Functions/DestinationSquares";
import { userContext } from "../App";
import { handlePieceMove } from "../Functions/handlePieceMove";

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
    nrOfHalfMoves,
    nrOfFullMoves,
    moveHistory,
    boardHistory,
    gameOver,
    setGameOver,
  } = useContext(boardContext);

  const { socket, userColor_ref } = useContext(userContext);

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
        socket.emit(
          "piece_moved",
          item.fromCell,
          squareProps.index,
          item.piece,
          item.pieceColor
        );
        handlePieceMove(
          item,
          squareProps.index,
          board,
          setBoard,
          wKingState,
          bKingState,
          enPassantTarget,
          player,
          setPlayer,
          wChecked,
          bChecked,
          lastMove,
          nrOfHalfMoves,
          checkmate,
          boardHistory,
          setGameOver,
          nrOfFullMoves,
          moveHistory
        );
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }), //Collects isOver into dropProps
  });

  return (
    <div
      ref={player === userColor_ref.current ? dropRef : null} //This component will be able to accept dragged items corresponding to dropRef if it is that users turn
      className={squareProps.color + "Square"}
      style={
        dropProps.isOver
          ? { filter: "drop-shadow(0 0 1.5rem blue)" }
          : { filter: squareProps.lastMoveHighlight }
      }
    >
      <div
        ref={
          squareProps.pieceColor === userColor_ref.current && !gameOver.isOver
            ? dragRef
            : null
        } //This component will be dragable if it matches the users color and game is not over.
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
