import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";
import { body } from "express-validator";
const authRoutes = Router();
authRoutes
  .route("/")
  .post(
    [body("email").isEmail().withMessage("invalid email")],
    loginController
  );

authRoutes
  .route("/register")
  .post(
    [
      body("email").isEmail().withMessage("Invalid email address"),
      body("name").notEmpty().withMessage("Name is required"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ],
    registerController
  );

export default authRoutes;
