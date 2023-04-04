import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Login = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    room,
    setRoom,
    socket,
    selectedColor,
    setSelectedColor,
    selectedTimeControl,
    setSelectedTimeControl,
    selectedTimeControl_ref,
    userColor,
    setUserColor,
    userColor_ref,
  } = useContext(userContext);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    console.log("now listening to server request for gameData");
    socket.on("server_request_for_gameData", () => {
      console.log("server requested my game data");
      console.log(`sending time control: ${selectedTimeControl} to server`);
      socket.emit("gameData_to_server", room, userColor, selectedTimeControl);
      navigate("/chezz");
    });
    // return () => socket.off("server_request_for_gameData");
  }, [socket, room, userColor, selectedTimeControl, navigate]);

  useEffect(() => {
    async function receiveGameData() {
      await socket.on(
        "gameData_to_client",
        (userColor_data, selectedTimeControl_data) => {
          console.log("server sent me the game data from other client");
          console.log(
            `receiving time control: ${selectedTimeControl_data} from server`
          );
          if (userColor_data === "white") {
            userColor_ref.current = "black";
          } else {
            userColor_ref.current = "white";
          }
          selectedTimeControl_ref.current = selectedTimeControl_data;
          navigate("/chezz");
        }
      );
    }

    receiveGameData();
  }, [socket, selectedTimeControl_ref, userColor_ref, navigate]);

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
        selectedTimeControl_ref={selectedTimeControl_ref}
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
  selectedTimeControl_ref,
  setUserColor,
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
          onClick={() => {
            setSelectedTimeControl("classical");
            selectedTimeControl_ref.current = "classical";
          }}
        >
          Classical
        </button>
        <button
          style={{ opacity: selectedTimeControl !== "rapid" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("rapid");
            selectedTimeControl_ref.current = "rapid";
          }}
        >
          Rapid
        </button>
        <button
          style={{ opacity: selectedTimeControl !== "blitz" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("blitz");
            selectedTimeControl_ref.current = "blitz";
          }}
        >
          Blitz
        </button>
        <button
          style={{ opacity: selectedTimeControl !== "bullet" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("bullet");
            selectedTimeControl_ref.current = "bullet";
          }}
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
