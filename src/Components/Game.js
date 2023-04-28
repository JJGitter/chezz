import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import setupBoard from "../Functions/setupBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useRef } from "react";
import setupFromFEN from "../Functions/setupFromFEN";
import createFEN from "../Functions/createFEN";
import NotationBox from "../Components/NotationBox";
import ChessTimer from "../Components/ChessTimer";
import ServerTimer from "./ServerTimer";
import GameChat from "./GameChat";
import { userContext } from "../App";
import { handlePieceMove } from "../Functions/handlePieceMove";
import resetBoard from "../Functions/resetBoard";

export const boardContext = React.createContext();

function Game() {
  console.log("----------------------------------------");
  const {
    socket,
    selectedTimeControl_ref,
    userColor_ref,
    isOnlinePlay_ref,
    selectedFEN,
  } = useContext(userContext);

  const [board, setBoard] = useState(setupBoard);
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
  const [displayRematchOffer, setDisplayRematchOffer] = useState(false);

  useEffect(() => {
    if (selectedFEN !== "") {
      setupFromFEN(
        selectedFEN,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameOver.isOver) {
      socket.emit("stop_timer");
    }
  }, [gameOver, socket]);

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
      socket.on("rematch_offer_to_client", () => {
        console.log("received rematch offer")
        setDisplayRematchOffer(true);
      });
    }
    return () => {
      socket.removeAllListeners("opponent_moved");
      socket.removeAllListeners("opponent_resigns");
      socket.removeAllListeners("receive_draw_offer");
      socket.removeAllListeners("receive_draw_accepted");
      socket.removeAllListeners("rematch_offer_to_client");
    };
  }, [socket, isOnlinePlay_ref]);

  useEffect(() => {
    socket.on("rematch_accepted_to_client", () => {
      // resetBoard();
      setupFromFEN(
        selectedFEN,
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
      setGameOver({ scenario: "", isOver: false });
      if (userColor_ref.current === "white") {
        userColor_ref.current = "black";
      } else {
        userColor_ref.current = "white";
      }
      beforeFirstMove_ref.current = true;
      setflippedBoard(userColor_ref.current === "black" && isOnlinePlay_ref.current ? true : false);
    });
    return () => {
      socket.removeAllListeners("rematch_accepted_to_client");
    };
  }, [socket, board, selectedFEN, userColor_ref, isOnlinePlay_ref]);

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

  const DisplayRematchOffer = () => {
    return (
      <>
        Opponent offers a rematch.
        <button
          onClick={() => {
            setDisplayRematchOffer(false);
            socket.emit("rematch_accepted",selectedTimeControl_ref.current);
            setupFromFEN(
              selectedFEN,
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
            setGameOver({ scenario: "", isOver: false });
            if (userColor_ref.current === "white") {
              userColor_ref.current = "black";
            } else {
              userColor_ref.current = "white";
            }
            beforeFirstMove_ref.current = true;
            setflippedBoard(userColor_ref.current === "black" && isOnlinePlay_ref.current ? true : false);
          }}
        >
          Accept
        </button>
        <button
          onClick={() => {
            setDisplayRematchOffer(false);
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
            {displayRematchOffer ? <DisplayRematchOffer /> : null}
            <div className="ButtonList">
              {!isOnlinePlay_ref.current ? (
                <button
                  id="gameScreenButton"
                  onClick={() => setflippedBoard(!flippedBoard)}
                >
                  Flip Board
                </button>
              ) : !gameOver.isOver ? (
                <button
                  id="gameScreenButton"
                  onClick={() => {
                    socket.emit("offer_draw");
                  }}
                >
                  Offer Draw
                </button>
              ) : null}
              {!gameOver.isOver ? (
                <button
                  id="gameScreenButton"
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
              ) : (
                <button
                  id="gameScreenButton"
                  onClick={() => {
                    socket.emit("offer_rematch");
                  }}
                >
                  Rematch
                </button>
              )}

              <button
                id="gameScreenButton"
                onClick={() => {
                  CopyToClipBoard(
                    createFEN(
                      board,
                      player,
                      wKingState,
                      bKingState,
                      enPassantTarget,
                      nrOfHalfMoves,
                      nrOfFullMoves,
                      boardHistory
                    )
                  );
                }}
              >
                Copy Current FEN
              </button>
            </div>
            {isOnlinePlay_ref.current ? <GameChat /> : null}

            {/* <TaskList /> */}
          </div>
        </DndProvider>
      </boardContext.Provider>
    </>
  );

  function CopyToClipBoard(text) {
    navigator.clipboard.writeText(text);
  }

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
