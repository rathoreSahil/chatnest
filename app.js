import express from "express";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import participantRouter from "./routes/participantRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import morgan from "morgan";

import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing.js";

const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:3000",
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
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);
app.use(
  "/api/v1/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      uploadthingId: process.env.UPLOADTHING_APP_ID,
      uploadthingSecret: process.env.UPLOADTHING_SECRET,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});

export default app;
