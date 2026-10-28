
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");

const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
const server = http.createServer(app);

const allowedOrigins = (
  process.env.CLIENT_ORIGINS ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Existing routes and rate limiting
app.use("/api/roles", roleRoutes);

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// MongoDB connection
async function connectMongo() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is missing from backend/.env");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    // Keep the server available for local Socket.IO testing.
    console.error("MongoDB connection failed:", error.name);
    console.error(error.message.split("\n")[0]);
  }
}

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB disconnected");
});

connectMongo();

// Health and existing APIs
app.get("/", (req, res) => {
  res.send("Foodie API is Running");
});

app.get("/api/health", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];

  res.json({
    status: "ok",
    mongo: states[mongoose.connection.readyState] || "unknown",
    realtime: "socket.io",
  });
});

app.use("/api/foods", foodRoutes);
app.use("/api/users", userLimiter, userRoutes);

// Real-time chat
const MAX_USERNAME = 30;
const MAX_MESSAGE = 500;

io.on("connection", (socket) => {
  console.log("Chat client connected:", socket.id);

  socket.on("chatMessage", (data) => {
    if (
      !data ||
      typeof data.username !== "string" ||
      typeof data.message !== "string"
    ) {
      socket.emit("chatError", {
        message: "Username and message are required.",
      });
      return;
    }

    const username = data.username.trim().slice(0, MAX_USERNAME);
    const message = data.message.trim().slice(0, MAX_MESSAGE);

    if (!username || !message) {
      socket.emit("chatError", {
        message: "Enter a username and a non-empty message.",
      });
      return;
    }

    io.emit("chatMessage", {
      username,
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Chat client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
