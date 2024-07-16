import express from "express";
import { chatController } from "../controllers/chatController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .get(authController.protect, chatController.getCurrentUserChats)
  .post(chatController.createChat)
  .delete(chatController.deleteAllChats);

export default router;
