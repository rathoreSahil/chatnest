import express from "express";
import { participantController } from "../controllers/participantController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.authorize,
    participantController.getAllParticipants
  )
  .post(participantController.addParticipants)
  .delete(participantController.deleteAllParticipants);

export default router;
