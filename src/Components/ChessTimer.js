import React, { useEffect, useState, useRef } from "react";

function ChessTimer({
  playerColor,
  clockColor,
  gameOver,
  setGameOver,
  selectedTimeControl_ref,
  beforeFirstMove_ref
}) {
  let nrOfSecondsInTimeControl;
  switch (selectedTimeControl_ref.current) {
    case "classical":
      nrOfSecondsInTimeControl = 1800;
      break;
    case "rapid":
      nrOfSecondsInTimeControl = 600;
      break;
    case "blitz":
      nrOfSecondsInTimeControl = 180;
      break;
    default:
      nrOfSecondsInTimeControl = 60;
  }
  const [whiteTime, setWhiteTime] = useState(nrOfSecondsInTimeControl);
  const [blackTime, setBlackTime] = useState(nrOfSecondsInTimeControl);
  let intervalRef = useRef(null);

  useEffect(() => {
    //reset timer upon rematch
    if (beforeFirstMove_ref.current) {
      setWhiteTime(nrOfSecondsInTimeControl);
      setBlackTime(nrOfSecondsInTimeControl);
    }
  }, [gameOver.isOver, nrOfSecondsInTimeControl, setWhiteTime, setBlackTime, beforeFirstMove_ref]);

  useEffect(() => {
    if (playerColor === "white" && !beforeFirstMove_ref.current) {
      //run white timer
      intervalRef.current = setInterval(() => {
        if (!gameOver.isOver) {
          setWhiteTime((previousTime) => previousTime - 1);
        }
      }, 1000);
    } else if (playerColor === "black") {
      //run black timer
      intervalRef.current = setInterval(() => {
        if (!gameOver.isOver) {
          setBlackTime((previousTime) => previousTime - 1);
        }
      }, 1000);
      beforeFirstMove_ref.current = false;
    }
    //clear interval when unmounting component
    return () => clearInterval(intervalRef.current);
  }, [playerColor, gameOver, beforeFirstMove_ref]);

  useEffect(() => {
    //pause timer when it reaches zero
    if (whiteTime === 0) {
      clearInterval(intervalRef.current);
      setGameOver({ scenario: "Black wins on time.", isOver: true });
    }
    if (blackTime === 0) {
      clearInterval(intervalRef.current);
      setGameOver({ scenario: "White wins on time.", isOver: true });
    }
  }, [blackTime, setGameOver, whiteTime]);

  //If checkmate or draw, stop the timer
  if (gameOver.isOver === true) {
    clearInterval(intervalRef.current);
  }

  const whiteMinutes = Math.floor(whiteTime / 60);
  const whiteSeconds = whiteTime % 60;

  const blackMinutes = Math.floor(blackTime / 60);
  const blackSeconds = blackTime % 60;

  return (
    <div className="TimerContainer">
      {clockColor === "white" ? (
        <span
          className="Timer"
          style={
            playerColor === "white" && !beforeFirstMove_ref.current
              ? { background: "#fffff0" }
              : {}
          }
        >
          {whiteMinutes < 10 ? "0" : ""}
          {whiteMinutes}:{whiteSeconds < 10 ? "0" : ""}
          {whiteSeconds}
        </span>
      ) : (
        <span
          className="Timer"
          style={playerColor === "black" ? { background: "#fffff0" } : {}}
        >
          {blackMinutes < 10 ? "0" : ""}
          {blackMinutes}:{blackSeconds < 10 ? "0" : ""}
          {blackSeconds}
        </span>
      )}
    </div>
  );
}

export default ChessTimer;
