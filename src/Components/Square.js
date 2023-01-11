import React from "react";
import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import MovePiece from "./MovePiece";
import { boardContext } from "../App";
import { useContext } from "react";

function Square(squareProps) {
  //This function component will return a square with a Piece (the Piece can be empty) inside of it.
  //The piece will be draggable and the square will be able to accept dropped pieces.
  const { board, setBoard } = useContext(boardContext);

  const [dragProps, dragRef] = useDrag({
    type: "piece",
    item: {
      fromCell: squareProps.index, //i.e. "C5"
      piece: squareProps.pieceType, //i.e. "Knight"
      pieceColor: squareProps.pieceColor
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }), //Collects isDragging into dragProps
  });

  const [dropProps, dropRef] = useDrop({
    accept: "piece", //the type of drag component that will be accepted to drop
    drop: (item, monitor) => {
      MovePiece(board, setBoard, item.piece, item.pieceColor, item.fromCell, squareProps.index);
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }), //Collects isOver into dropProps
  });

  return (
    <div
      ref={dropRef} //This component will be able to accept dragged items corresponding to dropRef
      className={
        dropProps.isOver ? "HoveredSquare" : squareProps.color + "Square"
      }
    >
      <div ref={dragRef} //This component will be dragable
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
