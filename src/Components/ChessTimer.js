import React, { useEffect, useState, useRef } from "react";

function ChessTimer({ playerColor, clockColor }) {
  let nrOfSecondsInTimeControl = 600;
  const [whiteTime, setWhiteTime] = useState(nrOfSecondsInTimeControl);
  const [blackTime, setBlackTime] = useState(nrOfSecondsInTimeControl);
  let intervalRef = useRef(null);
  let beforeFirstMoveRef = useRef(true); 

  useEffect(() => {
    if (playerColor === "white" && !beforeFirstMoveRef.current) {
      //run white timer
      intervalRef.current = setInterval(() => {
        setWhiteTime((previousTime) => previousTime - 1);
      }, 1000);
    } else if(playerColor === "black"){
      //run black timer
      intervalRef.current = setInterval(() => {
        setBlackTime((previousTime) => previousTime - 1);
      }, 1000);
      beforeFirstMoveRef.current = false;
    }
    //clear interval when unmounting component
    return () => clearInterval(intervalRef.current);
  }, [playerColor]);

  useEffect(() => {
    //pause timer when it reaches zero
    if (whiteTime === 0) {
      clearInterval(intervalRef.current);
    }
    if (blackTime === 0) {
      clearInterval(intervalRef.current);
    }
  });

  const whiteMinutes = Math.floor(whiteTime / 60);
  const whiteSeconds = whiteTime % 60;

  const blackMinutes = Math.floor(blackTime / 60);
  const blackSeconds = blackTime % 60;

  return (
    <div className="TimerContainer">
      {clockColor === "white" ? (
        <span className="Timer" style={(playerColor==="white" && !beforeFirstMoveRef.current) ? {background: "#fffff0"} : {}}>
          {whiteMinutes < 10 ? "0" : ""}
          {whiteMinutes}:{whiteSeconds < 10 ? "0" : ""}
          {whiteSeconds}
        </span>
      ) : (
        <span className="Timer" style={playerColor==="black" ? {background: "#fffff0"} : {}}>
          {blackMinutes < 10 ? "0" : ""}
          {blackMinutes}:{blackSeconds < 10 ? "0" : ""}
          {blackSeconds}
        </span>
      )}
    </div>
  );
}

export default ChessTimer;
