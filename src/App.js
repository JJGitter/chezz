import "./App.css";
import React, { useState } from "react";
import SetupBoard from "./Functions/SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useRef } from "react";
import SetupFromFEN from "./Functions/SetupFromFEN";
import CreateFEN from "./Functions/CreateFEN";
import NotationBox from "./Components/NotationBox";
import ChessTimer from "./Components/ChessTimer";

export const boardContext = React.createContext();

function App() {
  console.log("----------------------------------------");
  const [board, setBoard] = useState(SetupBoard);
  const [flippedBoard, setflippedBoard] = useState(false);
  const [player, setPlayer] = useState("white");

  const [gameOver, setGameOver] = useState({ scenario: "", isOver: false });

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
  const wChecked = useRef(false); // wChecked = {current: false}
  const bChecked = useRef(false); // bChecked = {current: false}

  const enPassantTarget = useRef("");
  const checkmate = useRef(false);
  const lastMove = useRef({ from: "", to: "" });
  const nrOfHalfMoves = useRef(0);
  const nrOfFullMoves = useRef(0);
  const moveHistory = useRef([]);
  const boardHistory = useRef(["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"]);

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
        nrOfHalfMoves,
        nrOfFullMoves,
        moveHistory,
        boardHistory,
        gameOver,
        setGameOver,
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
          <div>
            {!flippedBoard ? (
              <ChessTimer
                playerColor={player}
                clockColor={"black"}
                gameOver={gameOver}
                setGameOver={setGameOver}
              />
            ) : (
              <ChessTimer
                playerColor={player}
                clockColor={"white"}
                gameOver={gameOver}
                setGameOver={setGameOver}
              />
            )}
            {NotationBox(moveHistory, player, nrOfFullMoves)}
            {flippedBoard ? (
              <ChessTimer
                playerColor={player}
                clockColor={"black"}
                gameOver={gameOver}
                setGameOver={setGameOver}
              />
            ) : (
              <ChessTimer
                playerColor={player}
                clockColor={"white"}
                gameOver={gameOver}
                setGameOver={setGameOver}
              />
            )}
          </div>
          {gameOver.isOver ? (
            <div style={{ fontSize: 40 }}>{gameOver.scenario}</div>
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
                  wChecked,
                  bChecked,
                  moveHistory,
                  boardHistory
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
              <li>Put the game on a website</li>
              <li>Make it possible to choose promotion piece</li>
              <li>Material count</li>
            </ul>
          </div>
        </div>
      </DndProvider>
    </boardContext.Provider>
  );
}

export default App;
