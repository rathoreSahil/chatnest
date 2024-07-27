import express from "express";
import { authController } from "../controllers/authController.js";
import { userController } from "../controllers/userController.js";
import upload from "../multer.config.js";

const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.route("/").get(userController.getAllUsers).post(authController.signup);
router.get("/is-logged-in", authController.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User is logged in",
    data: {
      user: req.user,
    },
  });
});

router.get("/:id", userController.getUserById);

router
  .route("/photo")
  .patch(
    upload.single("photo"),
    authController.protect,
    userController.uploadProfilePhoto
  )
  .delete(authController.protect, userController.deleteProfilePhoto);

export default router;
