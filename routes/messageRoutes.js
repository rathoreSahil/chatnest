import express from "express";
import { messageController } from "../controllers/messageController.js";

const router = express.Router();

router
  .route("/")
  .post(messageController.addMessage)
  .delete(messageController.deleteAllMessages);

router.get("/:chatId", messageController.getMessagesByChatId);

export default router;
