import express from "express";
import { groupChatController } from "../controllers/groupChatController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .get(authController.protect, groupChatController.getCurrentUserGroupChats)
  .post(groupChatController.createGroupChat)
  .delete(groupChatController.deleteAllGroupChats);

export default router;
