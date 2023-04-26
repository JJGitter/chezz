import "./App.css";
import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Login from "./Components/Login";
import Game from "./Components/Game";

export const userContext = React.createContext();

// const socket = io("http://localhost:9000");
const socket = io("https://chezz-server.herokuapp.com/");

function App() {
  const [user, setUser] = useState("");

  const [selectedColor, setSelectedColor] = useState("random");
  const [selectedTimeControl, setSelectedTimeControl] = useState("rapid");

  const userColor_ref = useRef(Math.random() >= 0.5 ? "white" : "black");
  const selectedTimeControl_ref = useRef(selectedTimeControl);

  const [selectedFEN, setSelectedFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0");

  const isOnlinePlay_ref = useRef(true);

  console.log("app fires")
  return (
    <BrowserRouter>
      <userContext.Provider
        value={{ user, setUser, socket, selectedColor, setSelectedColor, selectedTimeControl, setSelectedTimeControl, selectedTimeControl_ref, userColor_ref, isOnlinePlay_ref, selectedFEN, setSelectedFEN }}
      >
        <Routes>
          <Route path="/chezz" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;

function NoMatch() {
  return <div>404. No match.</div>;
}
