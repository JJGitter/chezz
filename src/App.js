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
  const [enPassantTarget, setenPassantTarget] = useState("");

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
        setbKingState,
        enPassantTarget,
        setenPassantTarget
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
                console.log(UnderEnemyControl(board,player))
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
              <li>look over the UnderEnemyControl function. It doesn't return squares that are occupied by enemy pieces</li>
              <li>is King in check?</li>
              <li>button that flips the board</li>
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
