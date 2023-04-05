import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App";

function ServerTimer({
  playerColor,
  clockColor,
  setGameOver,
  selectedTimeControl_ref,
  beforeFirstMove_ref,
}) {
  const { socket } = useContext(userContext);
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

  useEffect(() => {
    socket.on("time_from_server", (whiteTime, blackTime) => {
      beforeFirstMove_ref.current = false;
      setWhiteTime(whiteTime);
      setBlackTime(blackTime);
    });
  }, [socket, beforeFirstMove_ref]);

  useEffect(() => {
    if (whiteTime === 0) {
      setGameOver({ scenario: "Black wins on time", isOver: true });
    } else if (blackTime === 0) {
      setGameOver({ scenario: "White wins on time", isOver: true });
    }
  }, [whiteTime, blackTime, setGameOver]);

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

export default ServerTimer;
