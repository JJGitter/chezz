import "./App.css";
import React, { useState } from "react";
import SetupBoard from "./Functions/SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useRef } from "react";
import SetupFromFEN from "./Functions/SetupFromFEN";
import CreateFEN from "./Functions/CreateFEN";
import NotationBox from "./Components/NotationBox";

export const boardContext = React.createContext();

function App() {
  console.log("----------------------------------------");
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
  const nrOfHalfMoves = useRef(0);
  const nrOfFullMoves = useRef(0);
  const moveHistory = useRef([]);

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
        nrOfHalfMoves,
        nrOfFullMoves,
        moveHistory,
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
          {NotationBox(moveHistory, player, nrOfFullMoves)}
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
                SetupFromFEN(
                  board,
                  setBoard,
                  setPlayer,
                  wKingState,
                  bKingState,
                  enPassantTarget,
                  nrOfHalfMoves,
                  nrOfFullMoves,
                  checkmate,
                  stalemate,
                  wChecked,
                  bChecked
                );
              }}
            >
              SetupFromFEN
            </button>
            <button
              onClick={() => {
                console.log(
                  CreateFEN(
                    board,
                    player,
                    wKingState,
                    bKingState,
                    enPassantTarget,
                    nrOfHalfMoves,
                    nrOfFullMoves
                  )
                );
               //console.log("stalemate? " + stalemate.current);
                console.log("enPassantTarget: " + enPassantTarget.current);
                // console.log(wKingState.current);
                // console.log(bKingState.current);
                //console.log("wchecked? " + wChecked.current);
                //console.log("bchecked? " + bChecked.current);
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
              <li>store the move history</li>
              <li>Display the move history</li>
              <li>Detect 3 move repetition</li>
              <li>make it possible to choose promotion piece</li>
              <li>material count</li>
              <li>add time control</li>
              <li>put the game on a website</li>
            </ul>
          </div>
        </div>
      </DndProvider>
    </boardContext.Provider>
  );
}

export default App;
