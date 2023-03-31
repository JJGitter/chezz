import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";


const Login = () => {
  const navigate = useNavigate();
  
  const {
    user,
    setUser,
    room,
    setRoom,
    joinRoom,
  } = useContext(userContext);

  return (
    <div>
      <h1>CHEZZ</h1>
      <h2>Local Game</h2>
      <div>
        <button
          onClick={() => {
            navigate("/chezz");
          }}
        >
          Play Locally
        </button>
        <h2>Online Game</h2>
        <div>
          Enter your name:
          <input
            type="text"
            value={user}
            onChange={(input) => {
              setUser(input.target.value);
            }}
          />
        </div>
        <form>
        <div>
          Enter game room:
          <input
            type="text"
            value={room}
            onChange={(input) => {
              setRoom(input.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            joinRoom();
            navigate("/lobby");
          }}
        >
          Start/Join Game
        </button>

        </form>
        
        {user !== "" && room !== "" ? (
          <div>
            Join as {user} in game room {room}.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;


