import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
import app from "./app.js";

// SOCKET.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});

// DATABASE
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3182;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
