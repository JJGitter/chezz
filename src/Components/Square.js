import React from "react";
import "../App.css";
import Piece from "./Piece";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

function Square(squareProps) {
  const [dragProps, dragRef] = useDrag({
    type: "piece",
    item: {
      fromCell: squareProps.index, //i.e. "C5"
      piece: squareProps.pieceType, //i.e. "knight"
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const [dropProps, dropRef] = useDrop({
    accept: "piece", //the type of drag component that will be accepted to drop
    drop: (item, monitor) => {console.log(item)},
    collect: (monitor) => ({ isOver: !!monitor.isOver }),   
  });

  return (
    <div ref={dropRef} className={squareProps.color + "Square"}>
      <div ref={dragRef}>
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
