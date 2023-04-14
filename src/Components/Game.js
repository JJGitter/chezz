import { TaskList } from "./TaskList";
import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import SetupBoard from "../Functions/SetupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useRef } from "react";
import SetupFromFEN from "../Functions/SetupFromFEN";
import CreateFEN from "../Functions/CreateFEN";
import NotationBox from "../Components/NotationBox";
import ChessTimer from "../Components/ChessTimer";
import ServerTimer from "./ServerTimer";
import GameChat from "./GameChat";
import { userContext } from "../App";
import { handlePieceMove } from "../Functions/handlePieceMove";

export const boardContext = React.createContext();

function Game() {
  console.log("----------------------------------------");
  const { socket, selectedTimeControl_ref, userColor_ref, isOnlinePlay_ref, selectedFEN } =
    useContext(userContext);

  const [board, setBoard] = useState(SetupBoard);
  const [flippedBoard, setflippedBoard] = useState(
    userColor_ref.current === "black" && isOnlinePlay_ref.current ? true : false
  ); // usercolor does not have time to update before this is run. Maybe usercolor should be a useRef?
  const [player, setPlayer] = useState("white");

  const [gameOver, setGameOver] = useState({ scenario: "", isOver: false });
  let beforeFirstMove_ref = useRef(true);

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

  const [opponentMoved, setOpponentMoved] = useState(false);
  const [receivedItem, setReceivedItem] = useState({});
  const [receivedToSquare, setReceivedToSquare] = useState("");
  const [displayDrawOffer, setDisplayDrawOffer] = useState(false);

  useEffect(() => {
    if(selectedFEN !== ""){
      SetupFromFEN(selectedFEN, board,
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
        boardHistory)
    }
  }, [])

  useEffect(() => {
    if (isOnlinePlay_ref.current) {
      socket.on(
        "opponent_moved",
        (fromSquare, toSquare, pieceType, pieceColor) => {
          setOpponentMoved(true);
          setReceivedItem({
            fromCell: fromSquare, //i.e. "c5"
            piece: pieceType, //i.e. "Knight"
            pieceColor: pieceColor,
          });
          setReceivedToSquare(toSquare);
        }
      );
      socket.on("opponent_resigns", (opponentColor) => {
        setGameOver({ scenario: `${opponentColor} resigns`, isOver: true });
      });
      socket.on("receive_draw_offer", () => {
        setDisplayDrawOffer(true);
      });
      socket.on("receive_draw_accepted", () => {
        setGameOver({ scenario: "Draw by agreement", isOver: true });
      });
    }
  }, [socket, isOnlinePlay_ref]);

  if (opponentMoved) {
    setOpponentMoved(false);
    handlePieceMove(
      receivedItem,
      receivedToSquare,
      board,
      setBoard,
      wKingState,
      bKingState,
      enPassantTarget,
      player,
      setPlayer,
      wChecked,
      bChecked,
      lastMove,
      nrOfHalfMoves,
      checkmate,
      boardHistory,
      setGameOver,
      nrOfFullMoves,
      moveHistory
    );
  }

  const DisplayDrawOffer = () => {
    return (
      <>
        Opponent offers a draw.
        <button
          onClick={() => {
            setGameOver({ scenario: "Draw by agreement", isOver: true });
            socket.emit("draw_accepted");
          }}
        >
          Accept
        </button>
        <button
          onClick={() => {
            setDisplayDrawOffer(false);
          }}
        >
          Decline
        </button>
      </>
    );
  };

  return (
    <>
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
              {DisplayTopClock(isOnlinePlay_ref)}
              {NotationBox(moveHistory, player, nrOfFullMoves)}
              {DisplayBottomClock(isOnlinePlay_ref)}
            </div>
            {gameOver.isOver ? (
              <div style={{ fontSize: 40 }}>{gameOver.scenario}</div>
            ) : displayDrawOffer ? (
              <DisplayDrawOffer />
            ) : null}
            <div className="ButtonList">
              {/* <button
                onClick={() => {
                  SetupFromFEN(
                    "rn2n1k1/ppp2ppp/8/2N5/2Pp4/8/PPP2PPP/R1B1R1K1 w - - 1 17",
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
              </button> */}
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
              <button
                onClick={() => {
                  setGameOver({
                    scenario: `${userColor_ref.current} resigns`,
                    isOver: true,
                  });
                  socket.emit("resign", userColor_ref.current);
                }}
              >
                Resign
              </button>
              <button
                onClick={() => {
                  socket.emit("offer_draw");
                }}
              >
                Offer Draw
              </button>
            </div>
            {isOnlinePlay_ref.current ? <GameChat /> : null}

            <TaskList />
          </div>
        </DndProvider>
      </boardContext.Provider>
    </>
  );

  function DisplayBottomClock(isOnlinePlay_ref) {
    let clock = null;

    if (isOnlinePlay_ref.current) {
      clock = flippedBoard ? (
        <ServerTimer
          playerColor={player}
          clockColor={"black"}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      ) : (
        <ServerTimer
          playerColor={player}
          clockColor={"white"}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      );
    } else {
      clock = flippedBoard ? (
        <ChessTimer
          playerColor={player}
          clockColor={"black"}
          gameOver={gameOver}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      ) : (
        <ChessTimer
          playerColor={player}
          clockColor={"white"}
          gameOver={gameOver}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      );
    }
    return clock;
  }

  function DisplayTopClock(isOnlinePlay_ref) {
    let clock = null;

    if (isOnlinePlay_ref.current) {
      clock = !flippedBoard ? (
        <ServerTimer
          playerColor={player}
          clockColor={"black"}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      ) : (
        <ServerTimer
          playerColor={player}
          clockColor={"white"}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      );
    } else {
      clock = !flippedBoard ? (
        <ChessTimer
          playerColor={player}
          clockColor={"black"}
          gameOver={gameOver}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      ) : (
        <ChessTimer
          playerColor={player}
          clockColor={"white"}
          gameOver={gameOver}
          setGameOver={setGameOver}
          selectedTimeControl_ref={selectedTimeControl_ref}
          beforeFirstMove_ref={beforeFirstMove_ref}
        />
      );
    }
    return clock;
  }
}

export default Game;
