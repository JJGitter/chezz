import React from "react";
import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";

function Square(squareProps) {
  const [ dragProps, dragRef] = useDrag({
    type: "piece",
    item: {
      fromCell: squareProps.index, //i.e. "C5"
      piece: squareProps.pieceType, //i.e. "knight"
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div className={squareProps.color + "Square"}>
      <div ref={dragRef} >
        <Piece
          pieceType={squareProps.pieceType}
          pieceColor={dragProps.isDragging? "grey" : squareProps.pieceColor}
          squareIndex={squareProps.index}
        />
      </div>
    </div>
  );
}

export default Square;
