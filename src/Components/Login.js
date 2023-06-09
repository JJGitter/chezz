import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
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

  const [awaitingOpponent, setAwaitingOpponent] = useState(false);

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
      console.log(`sending FEN: ${selectedFEN} to server`);
      socket.emit(
        "gameData_to_server",
        userColor_ref.current,
        selectedTimeControl_ref.current,
        selectedFEN
      );
      navigate("/game");
    });
    return () => socket.removeAllListeners("server_request_for_gameData");
  }, [socket, userColor_ref, selectedTimeControl_ref, navigate, selectedFEN]);

  useEffect(() => {
    async function receiveGameData() {
      await socket.on(
        "gameData_to_client",
        (userColor_data, selectedTimeControl_data, FEN_data) => {
          console.log("server sent me the game data from other client");
          console.log("receiving" + FEN_data);
          console.log(
            `receiving time control: ${selectedTimeControl_data} from server`
          );
          if (userColor_data === "white") {
            userColor_ref.current = "black";
          } else {
            userColor_ref.current = "white";
          }
          selectedTimeControl_ref.current = selectedTimeControl_data;
          setSelectedFEN(FEN_data);
          navigate("/game");
        }
      );
    }
    receiveGameData();
    return () => socket.removeAllListeners("gameData_to_client");
  }, [
    socket,
    selectedTimeControl_ref,
    userColor_ref,
    navigate,
    setSelectedFEN,
  ]);

  return (
    <div className="loginScreenContainer">
      <div className="loginMenuContainer">
        <h1 style={{ fontSize: 50 }}>CHEZZ</h1>

        {awaitingOpponent ? (
          <div style={{ fontSize: 100, color: "black" }}>
            Waiting for opponent to join...
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 30 }}>Game Options</h2>
            <CreateGameForm
              selectedTimeControl={selectedTimeControl}
              setSelectedTimeControl={setSelectedTimeControl}
              selectedTimeControl_ref={selectedTimeControl_ref}
              selectedFEN={selectedFEN}
              setSelectedFEN={setSelectedFEN}
            />
            <h2 style={{ fontSize: 30 }}>Local Game</h2>
            <LocalGameForm
              navigate={navigate}
              isOnlinePlay_ref={isOnlinePlay_ref}
            />
            <h2 style={{ fontSize: 30 }}>Online Game</h2>

            <div className="onlineSectionContainer">
              <OnlineGameForm
                user={user}
                setUser={setUser}
                joinRoom={joinRoom}
                setAwaitingOpponent={setAwaitingOpponent}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                userColor_ref={userColor_ref}
              />
            </div>
          </>
        )}

        {/* <button
        onClick={() =>
          console.log(socket.listeners("server_request_for_gameData").length)
        }
      >
        test
      </button> */}
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
          navigate("/game");
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
  setAwaitingOpponent,
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
            <p>Publish a New Game</p>
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
                if (user !== "") {
                  joinRoom();
                  setAwaitingOpponent(true);
                } else {
                  alert("Please enter your username.");
                }
              }}
            >
              Publish
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
