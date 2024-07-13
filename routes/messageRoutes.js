import express from "express";
import { authController } from "../controllers/authController.js";
import { messageController } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessagesByChatId);
router.delete("/", messageController.deleteAllMessages);

export default router;
