import express from "express";
import { directChatController } from "../controllers/directChatController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .get(authController.protect, directChatController.getCurrentUserDirectChats)
  .post(directChatController.createDirectChat)
  .delete(directChatController.deleteAllDirectChats);

export default router;
