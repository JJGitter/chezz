import React, { useEffect, useState, useRef } from "react";

function ChessTimer({ timerOn, setTimerOn }) {
  const [time, setTime] = useState(1800);
  let intervalRef = useRef(null);

  useEffect(() => {
    if (timerOn) {
      //initiate timer
      intervalRef.current = setInterval(() => {
        setTime((previousTime) => previousTime - 1);
      }, 1000);
    } else {
      //pause timer
      clearInterval(intervalRef.current);
    }
    //clear interval when unmounting component
    return () => clearInterval(intervalRef.current);
  }, [timerOn]);

  useEffect(() => {
    //pause timer when it reaches zero
    if (time === 0) {
      clearInterval(intervalRef.current);
      setTimerOn(false);
    }
  });

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      ChessTimer: {minutes < 10 ? "0" : ""}
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}

export default ChessTimer;
