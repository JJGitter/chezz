import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { TaskList } from "./TaskList";
import CreatedGamesList from "./CreatedGamesList";
import "../Login.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    socket,
    selectedColor,
    setSelectedColor,
    selectedTimeControl,
    setSelectedTimeControl,
    selectedTimeControl_ref,
    userColor_ref,
    isOnlinePlay_ref,
    selectedFEN,
    setSelectedFEN,
  } = useContext(userContext);

  const joinRoom = () => {
    if (user !== "") {
      socket.emit("create_game", user, selectedTimeControl);
    }
  };

  useEffect(() => {
    console.log("now listening to server request for gameData");
    socket.on("server_request_for_gameData", () => {
      console.log("server requested my game data");
      console.log(
        `sending time control: ${selectedTimeControl_ref.current} to server`
      );
      socket.emit(
        "gameData_to_server",
        userColor_ref.current,
        selectedTimeControl_ref.current
      );
      navigate("/chezz");
    });
    // return () => socket.off("server_request_for_gameData");
  }, [socket, userColor_ref, selectedTimeControl_ref, navigate]);

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
    <div className="loginScreenContainer">
      <h1 style={{ fontSize: 50 }}>CHEZZ</h1>
      <h2 style={{ fontSize: 30 }}>Game Options</h2>
      <CreateGameForm
        selectedTimeControl={selectedTimeControl}
        setSelectedTimeControl={setSelectedTimeControl}
        selectedTimeControl_ref={selectedTimeControl_ref}
        selectedFEN={selectedFEN}
        setSelectedFEN={setSelectedFEN}
      />
      <h2 style={{ fontSize: 30 }}>Local Game</h2>
      <LocalGameForm navigate={navigate} isOnlinePlay_ref={isOnlinePlay_ref} />
      <h2 style={{ fontSize: 30 }}>Online Game</h2>

      <div className="onlineSectionContainer">
        <OnlineGameForm
          user={user}
          setUser={setUser}
          joinRoom={joinRoom}
          navigate={navigate}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          userColor_ref={userColor_ref}
        />
      </div>
    </div>
  );
};

export default Login;

function CreateGameForm({
  selectedTimeControl,
  setSelectedTimeControl,
  selectedTimeControl_ref,
  selectedFEN,
  setSelectedFEN,
}) {
  return (
    <>
      <div className="timeControlSelection">
        <button
          id="timeControlButton"
          style={{ opacity: selectedTimeControl !== "classical" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("classical");
            selectedTimeControl_ref.current = "classical";
          }}
        >
          Classical
        </button>
        <button
          id="timeControlButton"
          style={{ opacity: selectedTimeControl !== "rapid" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("rapid");
            selectedTimeControl_ref.current = "rapid";
          }}
        >
          Rapid
        </button>
        <button
          id="timeControlButton"
          style={{ opacity: selectedTimeControl !== "blitz" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("blitz");
            selectedTimeControl_ref.current = "blitz";
          }}
        >
          Blitz
        </button>
        <button
          id="timeControlButton"
          style={{ opacity: selectedTimeControl !== "bullet" ? 0.5 : 1 }}
          onClick={() => {
            setSelectedTimeControl("bullet");
            selectedTimeControl_ref.current = "bullet";
          }}
        >
          Bullet
        </button>
      </div>
      <input
        id="FENInput"
        type="text"
        placeholder="FEN..."
        value={selectedFEN}
        onChange={(input) => {
          setSelectedFEN(input.target.value);
        }}
      />
    </>
  );
}

function LocalGameForm({ navigate, isOnlinePlay_ref }) {
  return (
    <>
      <button
        id="startButton"
        onClick={() => {
          isOnlinePlay_ref.current = false;
          navigate("/chezz");
        }}
      >
        Start
      </button>
    </>
  );
}

function OnlineGameForm({
  user,
  setUser,
  joinRoom,
  navigate,
  selectedColor,
  setSelectedColor,
  userColor_ref,
}) {
  return (
    <div className="onlineSection">
      <input
        id="usernameInput"
        type="text"
        placeholder="Username..."
        value={user}
        maxLength={10}
        onChange={(input) => {
          setUser(input.target.value);
        }}
      />

      <div className="createAndJoinGameSection">
        <div className="createGameContainer">
          <div className="createGameHeader">
            <p>Create a New Game</p>
          </div>
          <div className="createGameSection">
            <div className="colorSelection">
              <button
                id="whiteSelection"
                style={{ opacity: selectedColor !== "white" ? 0.5 : 1 }}
                onClick={() => {
                  setSelectedColor("white");
                  userColor_ref.current = "white";
                }}
              >
                Play as White
              </button>
              <button
                id="blackSelection"
                style={{ opacity: selectedColor !== "black" ? 0.5 : 1 }}
                onClick={() => {
                  setSelectedColor("black");
                  userColor_ref.current = "black";
                }}
              >
                Play as Black
              </button>
              <button
                id="randomSelection"
                style={{ opacity: selectedColor !== "random" ? 0.5 : 1 }}
                onClick={() => {
                  setSelectedColor("random");
                  let randomColor = Math.random() >= 0.5 ? "white" : "black";
                  userColor_ref.current = randomColor;
                }}
              >
                Random Color
              </button>
            </div>
            <button
              id="startButton"
              onClick={() => {
                joinRoom();
                navigate("/lobby");
                console.log(userColor_ref.current);
              }}
            >
              Create
            </button>
          </div>
        </div>

        <div className="joinGameSection">
          <CreatedGamesList />
        </div>
      </div>
    </div>
  );
}
