import React, { useEffect, useState, useRef } from "react";

function ChessTimer({ playerColor, clockColor }) {
  const [whiteTime, setWhiteTime] = useState(1800);
  const [blackTime, setBlackTime] = useState(1800);
  let intervalRef = useRef(null);

  useEffect(() => {
    if (playerColor === "white") {
      //run white timer
      intervalRef.current = setInterval(() => {
        setWhiteTime((previousTime) => previousTime - 1);
      }, 1000);
    } else {
      //run black timer
      intervalRef.current = setInterval(() => {
        setBlackTime((previousTime) => previousTime - 1);
      }, 1000);
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
    <div>
      {clockColor === "white" ? (
        <span>
          White: {whiteMinutes < 10 ? "0" : ""}
          {whiteMinutes}:{whiteSeconds < 10 ? "0" : ""}
          {whiteSeconds}
        </span>
      ) : (
        <span>
          Black: {blackMinutes < 10 ? "0" : ""}
          {blackMinutes}:{blackSeconds < 10 ? "0" : ""}
          {blackSeconds}
        </span>
      )}
    </div>
  );
}

export default ChessTimer;
