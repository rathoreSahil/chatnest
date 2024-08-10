import express from "express";
import { participantController } from "../controllers/participantController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .get(authController.authorize, participantController.getAllParticipants)
  .post(participantController.addParticipants)
  .delete(participantController.deleteAllParticipants);

router.get("/:groupId", participantController.getAdminStatus);

export default router;
