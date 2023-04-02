

function Lobby() {

  // const [message, setMessage] = useState("");
  // const [receivedMessage, setReceivedMessage] = useState(null);

  // const sendMessage = async () => {
  //   if (message !== "") {
  //     const messageData = {
  //       room: room,
  //       sendingUser: user,
  //       message: message,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };
  //     await socket.emit("send_message", messageData);
  //   }
  // };

  // const DisplayMessage = ({ data }) => {
  //   console.log(data.sendingUser + " says: " + data.message);
  //   const messageContent = data.sendingUser + " says: " + data.message;

  //   return (
  //     <>
  //       <div>{messageContent}</div>
  //       <div>{data.time}</div>
  //     </>
  //   );
  // };



  return (
    <div>
      <h1>Waiting for opponent to join...</h1>
      {/* <h2>Chat Message</h2>
      <input
        type={"text"}
        value={message}
        onChange={(input) => setMessage(input.target.value)}
      ></input>
      <button onClick={sendMessage}>Send</button>
      {receivedMessage ? <DisplayMessage data={receivedMessage} /> : null} */}
    </div>
  );
}

export default Lobby;
