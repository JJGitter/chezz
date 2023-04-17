import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";

function CreatedGamesList() {
  const { socket } = useContext(userContext);

  const [createdGames, setCreatedGames] = useState([
    {
      key: 'CsKKxQsBnJv5wlT7AAAd',
      createdBy: 'DDDDDDDDDD',
      timeControl: 'classical',
      room: 5
    },
    {
      key: 'dasdasffdgfghefqefdsfsdf',
      createdBy: 'Joel',
      timeControl: 'rapid',
      room: 6
    },
    {
      key: 'kijfhkoewjoicvfwjvjnbjr',
      createdBy: 'Niko',
      timeControl: 'bullet',
      room: 10
    },
    {
      key: 'asdadsadasfdsdfdfsgfdg',
      createdBy: 'DDDDDDDDDD',
      timeControl: 'classical',
      room: 5
    },
    {
      key: 'gfdgdfgjythythrt',
      createdBy: 'Joel',
      timeControl: 'rapid',
      room: 6
    },
    {
      key: 'vbcfvbgfjytjsdfrs',
      createdBy: 'Niko',
      timeControl: 'bullet',
      room: 10
    }
  ]);

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
        <p>Join a Published Game</p>
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
