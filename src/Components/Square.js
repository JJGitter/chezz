import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { boardContext } from "./Game";
import { useContext } from "react";
import destinationSquares from "../Functions/destinationSquares";
import { userContext } from "../App";
import { handlePieceMove } from "../Functions/handlePieceMove";
import { stringSplit } from "../Functions/movePiece";
import createTempBoard from "../Functions/createTempBoard";

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

  const { socket, userColor_ref, isOnlinePlay_ref } = useContext(userContext);

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
        destinationSquares(
          item,
          board,
          wKingState,
          bKingState,
          enPassantTarget
        ).includes(squareProps.index)
      ) {
        const [toColIndex, toRowIndex] = stringSplit(squareProps.index);
        const [fromColIndex, fromRowIndex] = stringSplit(item.fromCell);
        let isPromotion =
          item.piece === "Pawn" && (toRowIndex === 0 || toRowIndex === 7);

        if (!isPromotion) {
          if (isOnlinePlay_ref.current) {
            socket.emit(
              "piece_moved",
              item.fromCell,
              squareProps.index,
              item.piece,
              item.pieceColor
            );
          }
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
        } else {
          let tempBoard = createTempBoard(board);
          tempBoard[fromRowIndex][fromColIndex] = (
            <Square
              key={item.fromCell}
              index={item.fromCell}
              color={board[fromRowIndex][fromColIndex].props.color}
              pieceType=""
              pieceColor=""
            />
          );

          tempBoard[toRowIndex][toColIndex] = (
            <Square
              key={squareProps.index}
              index={squareProps.index}
              color={board[toRowIndex][toColIndex].props.color}
              pieceType={"Promotion"}
              pieceColor={item.pieceColor}
              movedItem = {item}
            />
          );
          setBoard(tempBoard);
        }
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }), //Collects isOver into dropProps
  });

  return (
    <div
      ref={
        isOnlinePlay_ref.current
          ? player === userColor_ref.current
            ? dropRef
            : null
          : dropRef
      } //In online play, this component will be able to accept dragged items corresponding to dropRef if it is that users turn
      className={squareProps.color + "Square"}
      style={
        dropProps.isOver
          ? { filter: "drop-shadow(0 0 1.5rem blue)" }
          : { filter: squareProps.lastMoveHighlight }
      }
    >
      <div
        ref={
          isOnlinePlay_ref.current
            ? squareProps.pieceColor === userColor_ref.current &&
              !gameOver.isOver
              ? dragRef
              : null
            : player === squareProps.pieceColor && !gameOver.isOver
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
          item={squareProps.movedItem}
        />
      </div>
    </div>
  );
}

export default Square;
