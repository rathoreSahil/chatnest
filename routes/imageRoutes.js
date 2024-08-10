import express from "express";
import upload from "../multer.config.js";
import { imageController } from "../controllers/imageController.js";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(upload.single("image"), imageController.uploadToCloudinary)
  .delete(imageController.deleteFromCloudinary);

export default router;
