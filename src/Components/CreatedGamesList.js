import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";

function CreatedGamesList() {
  const { socket } = useContext(userContext);

  const [createdGames, setCreatedGames] = useState([]);

  useEffect(() => {
    socket.on("existing_gameList_from_server", (gameList) => {
      //receive gameList upon connection
      setCreatedGames(gameList);
    });
    socket.on("game_was_created", (gameList) => {
      setCreatedGames(gameList);
    });
  }, [socket]);

  return (
    <div className="games_list_container">
      <div className="games_list_header">
        <p>List of Games</p>
      </div>

      <div className="games_list_body">
        {createdGames.map((game) => {
          return (
            <button
              onClick={handleJoinGame(game)}
              key={game.key}
              className="games_list_item"
            >
              {game.timeControl + " game VS " + game.createdBy}
            </button>
          );
        })}
      </div>
    </div>
  );

  function handleJoinGame(game) {
    return () => {
      console.log("Requesting to join room" + game.room);
      socket.emit("join_game_request", game.room);
    };
  }
}

export default CreatedGamesList;
