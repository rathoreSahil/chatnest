import express from "express";
import { authController } from "../controllers/authController.js";
import { userController } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);

export default router;
