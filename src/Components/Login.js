import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("random");
  const [selectedTimeControl, setSelectedTimeControl] = useState("rapid");
  const [userColor, setUserColor] = useState(Math.random() >= 0.5 ? "white" : "black");

  const { user, setUser, room, setRoom, joinRoom, socket } =
    useContext(userContext);

  useEffect(() => {
    socket.on("second_user_joined", () => {
      console.log("second user joined");
      navigate("/chezz");
    });
  }, [socket, navigate]);

  return (
    <div>
      <h1>CHEZZ</h1>

      <LocalGameForm navigate={navigate} />
      <OnlineGameForm
        user={user}
        setUser={setUser}
        room={room}
        setRoom={setRoom}
        joinRoom={joinRoom}
        navigate={navigate}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedTimeControl={selectedTimeControl}
        setSelectedTimeControl={setSelectedTimeControl}
        setUserColor={setUserColor}
      />
    </div>
  );
};

export default Login;

function LocalGameForm({ navigate }) {
  return (
    <>
      <h2>Local Game</h2>
      <button
        onClick={() => {
          navigate("/chezz");
        }}
      >
        Play Locally
      </button>
    </>
  );
}

function OnlineGameForm({
  user,
  setUser,
  room,
  setRoom,
  joinRoom,
  navigate,
  selectedColor,
  setSelectedColor,
  selectedTimeControl,
  setSelectedTimeControl,
  setUserColor
}) {
  return (
    <>
      <h2>Online Game</h2>
      <div className="colorSelection">
        <button
          style={{ opacity: selectedColor !== "white" ? 0.5 : 1 }}
          onClick={() => setSelectedColor("white")}
        >
          Play as White
        </button>
        <button
          style={{ opacity: selectedColor !== "black" ? 0.5 : 1 }}
          onClick={() => setSelectedColor("black")}
        >
          Play as Black
        </button>
        <button
          style={{ opacity: selectedColor !== "random" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedColor("random");
            const randomColor = Math.random() >= 0.5 ? "white" : "black";
            setUserColor(randomColor);
          }}
        >
          Randomize Color
        </button>
      </div>
      <div className="timeControlSelection">
        <button
          style={{ opacity: selectedTimeControl !== "classical" ? 0.5 : 1 }}
          onClick={() => setSelectedTimeControl("classical")}
        >
          Classical
        </button>
        <button
          style={{ opacity: selectedTimeControl !== "rapid" ? 0.5 : 1 }}
          onClick={() => setSelectedTimeControl("rapid")}
        >
          Rapid
        </button>
        <button
          style={{ opacity: selectedTimeControl !== "blitz" ? 0.5 : 1 }}
          onClick={() => setSelectedTimeControl("blitz")}
        >
          Blitz
        </button>
        <button
          style={{ opacity: selectedTimeControl !== "bullet" ? 0.5 : 1 }}
          onClick={() => setSelectedTimeControl("bullet")}
        >
          Bullet
        </button>
      </div>
      <form>
        <input
          type="text"
          placeholder="Name..."
          value={user}
          onChange={(input) => {
            setUser(input.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID..."
          value={room}
          onChange={(input) => {
            setRoom(input.target.value);
          }}
        />
        <button
          onClick={() => {
            joinRoom();
            navigate("/lobby");
          }}
        >
          {user !== "" && room !== "" ? (
            <div>
              Enter game room {room} as {user}
            </div>
          ) : (
            "Create/Join Game"
          )}
        </button>
      </form>
    </>
  );
}
