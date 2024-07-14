import express from "express";
import { authController } from "../controllers/authController.js";
import { userController } from "../controllers/userController.js";
import upload from "../multer.config.js";

const router = express.Router();

router.post(
  "/signup",
  upload.single("image"),
  userController.uploadProfilePhoto,
  authController.signup
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);
router.get("/is-logged-in", authController.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User is logged in",
    data: {
      user: req.user,
    },
  });
});

export default router;
