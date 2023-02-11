import React from "react";
import "../App.css";

function NotationElements(moveHistory, player, nrOfFullMoves) {
  let array = [];

  //if player === white, add the fullMoveNr in front of the NotationElement

  for (let i = 0; i < moveHistory.current.length; i++) {
    if (i % 2 === 0) {
      array.push(
        <div
          key={-i - 1}
          style={{
            marginLeft: ".5rem",
            fontWeight: "bold",
            color: "black",
            fontSize: "2.4vh",
          }}
        >
          {" "}
          {i / 2 + 1}.{" "}
        </div>
      );
    }
    array.push(
      <div key={i} className="NotationElement" style={{ marginLeft: ".5rem" }}>
        {moveHistory.current[i]}
      </div>
    );
  }
  return array;
}

export default NotationElements;
