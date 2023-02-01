import "./App.css";
import React, { useState } from "react";
import SetupBoard from "./Functions/SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useRef } from "react";
import SetupFromFEN from "./Functions/SetupFromFEN";

export const boardContext = React.createContext();
let renderCount = 0;

function App() {
  renderCount++;
  console.log("render " + renderCount);
  const [board, setBoard] = useState(SetupBoard);
  const [flippedBoard, setflippedBoard] = useState(false);

  const [player, setPlayer] = useState("white");

  const bKingState = useRef({
    hasKSideCastlingRights: true,
    hasQSideCastlingRights: true,
    position: "e8",
  });


  const wKingState = useRef({
      hasKSideCastlingRights: true,
      hasQSideCastlingRights: true,
      position: "e1",
    });

  const wChecked = useRef(false); // wCheck = {current: false}
  const bChecked = useRef(false); // bCheck = {current: false}

  const enPassantTarget = useRef("");
  const checkmate = useRef(false);
  const stalemate = useRef(false);
  const lastMove = useRef({ from: "", to: "" });

  return (
    <boardContext.Provider
      value={{
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
        stalemate,
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
          {checkmate.current ? (
            <div style={{ fontSize: 40 }}>CHECKMATE</div>
          ) : stalemate.current ? (
            <div style={{ fontSize: 40 }}>STALEMATE</div>
          ) : (
            <div style={{ fontSize: 25 }}>{player} to move</div>
          )}
          <div className="ButtonList">
            <button
              onClick={() => {
                SetupFromFEN(board,setBoard, setPlayer,wKingState, bKingState,enPassantTarget);

              }}
            >
              SetupFromFEN
            </button>
            <button
              onClick={() => {
                console.log("enPassantTarget: " + enPassantTarget.current)
                console.log(wKingState.current)
                console.log(bKingState.current)
                // console.log(wChecked.current);
                // console.log(bChecked.current);
                // console.log("checkmate: " + checkmate.current)
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
              <li>create FEN</li>
              <li>import FEN</li>
              <li>some pawn captures are not highlighted properly as the last move</li>
              <li>checkmate is not always detected</li>
              <li>Detect stalemate</li>
              <li>Detect 3 move repetition</li>
              <li>make it possible to choose promotion piece</li>
              <li>material count</li>
              <li>nr of halfmoves</li>
              <li>nr of moves</li>
              <li>store the move history</li>
              <li>put the game on a website</li>
              <li>add time control</li>
            </ul>
          </div>
        </div>
      </DndProvider>
    </boardContext.Provider>
  );
}

export default App;
