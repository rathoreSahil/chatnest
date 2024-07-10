import express from "express";
import { authController } from "../controllers/authController.js";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

router.get("/:userId", chatController.getChatsByUserId);

export default router;
