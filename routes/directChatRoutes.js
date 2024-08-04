import express from "express";
import { authController } from "../controllers/authController.js";
import { directChatController } from "../controllers/directChatController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(directChatController.getCurrentUserDirectChats)
  .post(directChatController.createDirectChat)
  .delete(directChatController.deleteAllDirectChats);

router
  .route("/:id")
  .get(directChatController.getDirectChatById)
  .patch(directChatController.updateDirectChat);

export default router;
