import express from "express";
import upload from "../multer.config.js";
import { imageController } from "../controllers/imageController.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), imageController.uploadToCloudinary)
  .delete(imageController.deleteFromCloudinary);

export default router;
