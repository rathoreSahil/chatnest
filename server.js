import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import app from "./app.js";

dotenv.config();

// SERVER
const httpServer = createServer(app);

// CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DATABASE
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// SOCKET.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  socket.on("message", (message) => {
    const room = message.directChat || message.groupChat;
    io.to(room).emit("message", message);
  });

  socket.on("new-chat-self", (newChat) => {
    socket.emit("new-chat", newChat);
  });
  socket.on("new-chat", (user_id, newChat) => {
    const socketId = userSocketMap[user_id];
    if (socketId) {
      socket.to(socketId).emit("new-chat", newChat);
    }
  });

  socket.on("join-room", (chatId) => {
    socket.join(chatId);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
    delete userSocketMap[userId];
  });
});

// listen for incoming requests
const PORT = process.env.PORT || 3182;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
