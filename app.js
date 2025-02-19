import express from "express";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import participantRouter from "./routes/participantRoutes.js";
import groupChatRouter from "./routes/groupChatRoutes.js";
import directChatRouter from "./routes/directChatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

import morgan from "morgan";

const app = express();

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// data sanitization against NoSql query injection
app.use(mongoSanitize());

// data sanitization againt xss
app.use(xss());

// logger
app.use(morgan("dev"));

// ROUTING
app.use("/api/v1/users", userRouter);
app.use("/api/v1/participants", participantRouter);
app.use("/api/v1/chats/group", groupChatRouter);
app.use("/api/v1/chats/direct", directChatRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/images", imageRouter);

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});

export default app;
