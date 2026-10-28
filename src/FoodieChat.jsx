
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./FoodieChat.css";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function FoodieChat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("chatMessage", (data) => {
      setMessages((previous) => [...previous, data]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();

    const cleanName = username.trim().slice(0, 30);
    const cleanMessage = message.trim().slice(0, 500);

    if (!cleanName || !cleanMessage || !connected) return;

    socketRef.current.emit("chatMessage", {
      username: cleanName,
      message: cleanMessage,
    });

    setMessage("");
  }

  return (
    <section className="foodie-chat">
      <div className="chat-heading">
        <div>
          <h2>Foodie Community Chat</h2>
          <p>Chat with other food lovers in real time.</p>
        </div>
        <span className={connected ? "chat-status online" : "chat-status"}>
          {connected ? "Connected" : "Connecting..."}
        </span>
      </div>

      <label htmlFor="chat-username">Your name</label>
      <input
        id="chat-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        maxLength={30}
        placeholder="Enter your name"
      />

      <div className="chat-messages" aria-live="polite">
        {messages.length === 0 && (
          <p className="chat-empty">
            No messages yet. Start the conversation!
          </p>
        )}

        {messages.map((item, index) => (
          <div className="chat-message" key={index}>
            <strong>{item.username}</strong>
            <p>{item.message}</p>
            {item.time && <small>{item.time}</small>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          placeholder="Type a message..."
          aria-label="Chat message"
        />
        <button type="submit" disabled={!connected || !username.trim() || !message.trim()}>
          Send
        </button>
      </form>

      {!connected && (
        <p className="chat-help">
          Chat server is unavailable. Start the backend and try again.
        </p>
      )}
    </section>
  );
}
