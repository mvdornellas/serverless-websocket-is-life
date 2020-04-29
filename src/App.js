import React, { useState } from "react";
import "./App.css";
import Sockette from "sockette";

const ws = new Sockette(
  "wss://3oln1eoy12.execute-api.us-east-2.amazonaws.com/dev",
  {
    timeout: 5e3,
    maxAttempts: 1,
    onopen: (e) => console.log("Connected!", e),
    onmessage: (e) => {
      // setMessageReceived(e.data);
      console.log("Received:", e);
      alert(e.data)
    },
    onreconnect: (e) => console.log("Reconnecting...", e),
    onmaximum: (e) => console.log("Stop Attempting!", e),
    onclose: (e) => console.log("Closed!", e),
    onerror: (e) => console.log("Error:", e),
  }
);

ws.open();

function App() {
  

  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <p>Message Send: {message}</p>
      <input
        id="message"
        onChange={(e) => setMessage(e.target.value)}
        className="input"
      ></input>
      <button
        onClick={(e) => {
          console.log('ujmmmmm')
          const data = {
            action: "sendMessage",
            data: message,
          };

          console.log("Data send", data);
          ws.json(data);
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
