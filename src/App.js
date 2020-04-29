import React, { useState, useEffect } from "react";
import "./App.css";
import Sockette from "sockette";

function App() {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [usersActive, setUsersActive] = useState([]);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    setWs(
      new Sockette("wss://3oln1eoy12.execute-api.us-east-2.amazonaws.com/dev", {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: (e) => console.log("Connected!", e),
        onmessage: (e) => {
          console.log("Received:", e);
          const data = JSON.parse(e.data);
          if (data.action === "sendMessage") {
            setMessages((messages) => [
              ...messages,
              {
                from: e.data,
                to: e.data,
                data: e.data,
              },
            ]);
          }

          if (data.action === "newUser") {
            setUsersActive((users) => [
              ...users,
              {
                from: e.data,
                to: e.data,
                data: e.data,
              },
            ]);
          }
        },
        onreconnect: (e) => console.log("Reconnecting...", e),
        onmaximum: (e) => console.log("Stop Attempting!", e),
        onclose: (e) => console.log("Closed!", e),
        onerror: (e) => console.log("Error:", e),
      })
    );
  }, []);

  return (
    <div className="App">
      <form
        id="chat"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Name:</label>
        {!submittedForm ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            required
          ></input>
        ) : (
          <label>{userName}</label>
        )}
        <label>Users:</label>
        <select>
          <option value="">Selecione</option>
          {usersActive &&
            usersActive.length > 0 &&
            usersActive.map((a) => (
              <option
                onChange={(e) => setUserSelected(e.target.value)}
                value={a.name}
              >
                {a.name}
              </option>
            ))}
        </select>
        <label>Message:</label>
        <input
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          className="input"
          required
        ></input>
        <button
          onClick={(e) => {
            if (userName) setSubmittedForm(true);
            const data = {
              action: "sendMessage",
              data: message,
              to: userSelected,
              from: userName,
            };
            ws.json(data);
          }}
        >
          Send
        </button>
      </form>
      <br></br>
      <div>
        <h1>Messages</h1>
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <div>
              <p>
                From: {message.from} | Message: {message.data}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
