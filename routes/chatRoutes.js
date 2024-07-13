import express from "express";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatController.createChat);
router.get("/:userId", chatController.getChatsByUserId);
router.delete("/", chatController.deleteAllChats);

export default router;
