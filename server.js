import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

// SERVER
const httpServer = createServer(app);

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

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.to(message.chat).emit("message", message);
  });

  socket.on("join-room", (chatId) => {
    socket.join(chatId);
  });

  socket.on("join-rooms", (chatIds) => {
    chatIds.forEach((chatId) => {
      socket.join(chatId);
    });
  });
});

const PORT = process.env.PORT || 3182;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
