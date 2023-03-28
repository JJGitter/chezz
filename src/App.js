import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Login from "./Components/Login";
import Game from "./Components/Game";

function App() {
  client();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="chezz" element={<Game/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


function client() {
  const socket = io("http://localhost:9000");

  console.log("Trying to connect to server");
  socket.on("connect", () => {
    console.log(`You connected to server with id: ${socket.id}`);
    socket.emit("custom-event", 14, "randomString", { yolo: "swag" });
  });
}