import express from "express";
import { participantController } from "../controllers/participantController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/",
  authController.protect,
  authController.authorize,
  participantController.getAllParticipants
);

router.post("/", participantController.addParticipants);

export default router;
