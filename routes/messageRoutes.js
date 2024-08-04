import express from "express";
import { messageController } from "../controllers/messageController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(messageController.addMessage)
  .delete(messageController.deleteAllMessages);

router.get("/:chatId", messageController.getMessagesByChatId);

export default router;
