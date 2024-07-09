import express from "express";
import { authController } from "../controllers/authController.js";
import { userController } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get(
  "/",
  authController.protect,
  authController.authorize,
  userController.getAllUsers
);
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
