import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Login from "./Components/Login";
import Game from "./Components/Game";
import Lobby from "./Components/Lobby";



export const userContext = React.createContext();

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  const socket = io("http://localhost:9000");



  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  
  

  return (
    <BrowserRouter>
      <userContext.Provider
        value={{ user, setUser, room, setRoom, joinRoom, socket }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="chezz" element={<Game />} />
          <Route path="lobby" element={<Lobby />} />
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
