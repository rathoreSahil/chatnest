import express from "express";
import { groupChatController } from "../controllers/groupChatController.js";
import { authController } from "../controllers/authController.js";
import upload from "../multer.config.js";

const router = express.Router();

router
  .route("/")
  .get(authController.protect, groupChatController.getCurrentUserGroupChats)
  .post(groupChatController.createGroupChat)
  .delete(groupChatController.deleteAllGroupChats);

router
  .route("/:id")
  .get(groupChatController.getGroupChatById)
  .patch(groupChatController.updateGroupChat);

router
  .route("/:groupId/photo")
  .patch(upload.single("photo"), groupChatController.uploadGroupChatPhoto)
  .delete(groupChatController.deleteGroupChatPhoto);

export default router;
