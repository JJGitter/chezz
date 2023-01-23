import "./App.css";
import React, { useState } from "react";
import SetupBoard from "./Functions/SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const boardContext = React.createContext();

function App() {
  const [board, setBoard] = useState(SetupBoard);
  const [player, setPlayer] = useState("white");
  const [bKingState, setbKingState] = useState({
    hasKSideCastlingRights: true,
    hasQSideCastlingRights: true,
    position: "e8",
  });
  const [wKingState, setwKingState] = useState({
    hasKSideCastlingRights: true,
    hasQSideCastlingRights: true,
    position: "e1",
  });
  const [wChecked, setwChecked] = useState(false);
  const [bChecked, setbChecked] = useState(false);

  const [enPassantTarget, setenPassantTarget] = useState("");
  const [flippedBoard, setflippedBoard] = useState(false);

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
        setenPassantTarget,
        wChecked,
        bChecked,
        setwChecked,
        setbChecked,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          {!flippedBoard ? (
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
          ) : (
            <div className="Board">
              <div className="row">{board[7].slice().reverse()}</div>
              <div className="row">{board[6].slice().reverse()}</div>
              <div className="row">{board[5].slice().reverse()}</div>
              <div className="row">{board[4].slice().reverse()}</div>
              <div className="row">{board[3].slice().reverse()}</div>
              <div className="row">{board[2].slice().reverse()}</div>
              <div className="row">{board[1].slice().reverse()}</div>
              <div className="row">{board[0].slice().reverse()}</div>
            </div>
          )}
          <div style={{ fontSize: 25 }}>{player} to move</div>

          <div className="ButtonList">
            <button
              onClick={() => {
                // console.log(UnderEnemyControl(board, player));
                console.log(
                  "white king : " +
                    wKingState.position +
                    " checked=" +
                    wChecked
                );
                console.log(
                  "black king: " +
                    bKingState.position +
                    " checked=" +
                    bChecked
                );
                console.log("wking has king side castling rights: " + wKingState.hasKSideCastlingRights)
                console.log("bking has king side castling rights: " + bKingState.hasKSideCastlingRights)
                console.log("---------------------------------------------- ")

              }}
            >
              Test
            </button>
            <button onClick={() => setflippedBoard(!flippedBoard)}>
              Flip Board
            </button>
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
              <li>
                fix so that a move that puts your own king in check is illegal
              </li>
              <li>highligt last move</li>
              <li>make it possible to choose promotion piece</li>
              <li>material count</li>
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
