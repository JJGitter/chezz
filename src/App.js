import "./App.css";
import React, { useState } from "react";
import SetupBoard from "./Functions/SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import UnderEnemyControl from "./Functions/UnderEnemyControl";

export const boardContext = React.createContext();

function App() {
  const [board, setBoard] = useState(SetupBoard);
  const [player, setPlayer] = useState("white");
  const [bKingState, setbKingState] = useState({
    hasKSideCastlingRights: true,
    hasQSideCastlingRights: true,
    isChecked: false,
  });
  const [wKingState, setwKingState] = useState({
    hasKSideCastlingRights: true,
    hasQSideCastlingRights: true,
    isChecked: false,
  });

  return (
    <boardContext.Provider
      value={{
        board,
        setBoard,
        player,
        setPlayer,
        wKingState,
        bKingState,
        setwKingState,
        setbKingState
      }}
    >
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
          <div style={{ fontSize: 25 }}>{player} to move</div>

          <div className="ButtonList">
            <button
              onClick={() => {
                // console.log(UnderEnemyControl(player,board));
                // UnderEnemyControl(player, board);
                console.log("d1: " + board[7][4].props.pieceType)
                console.log("f1: " + board[7][5].props.pieceType)
                console.log("g1: " + board[7][6].props.pieceType)
                console.log("h1: " + board[7][7].props.pieceType)
                console.log("row length: " + board[7].length)
              }}
            >
              Test
            </button>
            <button>Another button</button>
          </div>
          <div className="taskList">
            <h3
              style={{
                fontStyle: "normal",
              }}
            >
              Task List
            </h3>
            <ul>
              <li>list of enemy controlled squares</li>
              <li>button that flips the board</li>
              <li>enPassant target state</li>
              <li>castling opportunities state</li>
              <li>highligt last move</li>
              <li>make it possible to choose promotion piece</li>
              <li>nr of halfmoves</li>
              <li>nr of moves</li>
              <li>create FEN</li>
              <li>import FEN</li>
            </ul>
          </div>
        </div>
      </DndProvider>
    </boardContext.Provider>
  );
}

export default App;
