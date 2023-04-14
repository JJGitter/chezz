import React from "react";
export function TaskList() {
  return (
    <div className="taskList">
      <h3
        style={{
          fontStyle: "normal",
        }}
      >
        Task List
      </h3>
      <ul>
        <li>Create a "copy current FEN" button on the game screen</li>
        <li>Style the login screen</li>
        <li>Style the game screen</li>
        <li>Manage the chat window sizing</li>
        <li>Make it possible to choose promotion piece</li>
        <li>Material count</li>
      </ul>
    </div>
  );
}
