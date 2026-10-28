import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/layout/Navbar";
import { UserContext } from "../context/UserContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
const MAX_USERNAME = 30;
const MAX_MESSAGE = 500;

function Chat() {
  useDocumentTitle("Foodie - Live Chat");

  const { name } = useContext(UserContext);
  const [username, setUsername] = useState(name || "");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    const handleConnect = () => {
      setStatus("connected");
      setError("");
    };

    const handleDisconnect = () => {
      setStatus("disconnected");
    };

    const handleConnectError = () => {
      setStatus("disconnected");
      setError("Could not reach the live chat server.");
    };

    const handleChatMessage = (payload) => {
      setMessages((current) => [...current, payload]);
    };

    const handleChatError = (payload) => {
      setError(payload?.message || "Message was not sent.");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("chatMessage", handleChatMessage);
    socket.on("chatError", handleChatError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("chatMessage", handleChatMessage);
      socket.off("chatError", handleChatError);
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = username.trim().slice(0, MAX_USERNAME);
    const trimmedMessage = message.trim().slice(0, MAX_MESSAGE);

    if (!trimmedName) {
      setError("Enter a username before sending.");
      return;
    }

    if (!trimmedMessage) {
      setError("Enter a message before sending.");
      return;
    }

    if (!socketRef.current || status !== "connected") {
      setError("You are not connected to live chat yet.");
      return;
    }

    socketRef.current.emit("chatMessage", {
      username: trimmedName,
      message: trimmedMessage,
    });
    setMessage("");
    setError("");
  }

  const statusLabel =
    status === "connected"
      ? "Connected"
      : status === "connecting"
        ? "Connecting..."
        : "Disconnected";

  const statusClass =
    status === "connected"
      ? "bg-green-100 text-green-700"
      : status === "connecting"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Live Kitchen Chat
            </h1>
            <p className="mt-1 text-gray-600">
              Messages appear instantly in other browsers — no refresh needed.
            </p>
          </div>
          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${statusClass}`}
          >
            {statusLabel}
          </span>
        </div>

        <section className="overflow-hidden rounded-2xl bg-white shadow-md">
          <div
            ref={listRef}
            className="h-[420px] space-y-3 overflow-y-auto bg-orange-50/40 p-4 sm:p-6"
          >
            {messages.length === 0 ? (
              <p className="py-16 text-center text-gray-500">
                No messages yet. Open this page in two tabs and start chatting.
              </p>
            ) : (
              messages.map((item, index) => {
                const isOwn =
                  item.username.trim().toLowerCase() ===
                  username.trim().toLowerCase();
                return (
                  <article
                    key={`${item.time}-${index}`}
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      isOwn
                        ? "ml-auto bg-orange-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                      <span
                        className={
                          isOwn ? "font-semibold text-orange-50" : "font-semibold text-orange-600"
                        }
                      >
                        {item.username}
                      </span>
                      <span className={isOwn ? "text-orange-100" : "text-gray-400"}>
                        {item.time}
                      </span>
                    </div>
                    <p className="break-words text-sm sm:text-base">{item.message}</p>
                  </article>
                );
              })
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 border-t border-orange-100 p-4 sm:p-6"
          >
            <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
              <label className="sr-only" htmlFor="chat-username">
                Username
              </label>
              <input
                id="chat-username"
                type="text"
                maxLength={MAX_USERNAME}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Your name"
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <label className="sr-only" htmlFor="chat-message">
                Message
              </label>
              <input
                id="chat-message"
                type="text"
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message..."
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                {message.length}/{MAX_MESSAGE} characters
              </p>
              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
                disabled={status !== "connected"}
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Chat;
