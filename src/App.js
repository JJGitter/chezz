import "./App.css";
import React, { useState } from "react";
import SetupBoard from "./SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const [board, setBoard] = useState(SetupBoard);
  //console.log(row1[0].props.pieceType)
  //console.log(row4[4].props.pieceType);
  //console.log(board[0][4].props.pieceType);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="Board">
          <div className="row">{board[0]}</div>
          <div className="row">{board[1]}</div>
          <div className="row">{board[2]}</div>
          <div className="row">{board[3]}</div>
          <div className="row">{board[4]}</div>
          <div className="row">{board[5]}</div>
          <div className="row">{board[6]}</div>
          <div className="row">{board[7]}</div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
