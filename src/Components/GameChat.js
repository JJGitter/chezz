import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import ScrollToBottom from "react-scroll-to-bottom";

function GameChat() {
  const { user, room, socket } = useContext(userContext);

  const [messageToSend, setMessageToSend] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (messageToSend !== "") {
      let messageTime = new Date(Date.now());
      const messageData = {
        room: room,
        sendingUser: user,
        message: messageToSend,
        time:
          (messageTime.getHours() < 10 ? "0" : "") +
          messageTime.getHours() +
          ":" +
          (messageTime.getMinutes() < 10 ? "0" : "") +
          messageTime.getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessageToSend("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatWindow">
      <div className="chatHeader">
        <p>Live Chat</p>
      </div>
      <div className="chatBody">
        <DisplayMessage messageList={messageList} user={user} />
      </div>

      <div className="chatFooter">
        <input
          type="text"
          value={messageToSend}
          placeholder="Write a message..."
          onChange={(input) => {
            setMessageToSend(input.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default GameChat;

const DisplayMessage = ({ messageList, user }) => {
  return (
    <ScrollToBottom className="messageContainer">
      {messageList.map((message, index) => {
        return (
          <div
            key={index}
            id={user === message.sendingUser ? "you" : "other"}
            className="message"
          >
            <div>
              <div className="messageContent">
                <p>{message.message}</p>
              </div>
              <div className="messageMeta">
                <p id="time">{message.time}</p>
                <p id="author">{message.sendingUser}</p>
              </div>
            </div>
          </div>
        );
      })}
    </ScrollToBottom>
  );
};
