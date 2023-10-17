import { Router } from "express";
import authController from "../controllers/authController";
import { tokenValidator } from "../middlewares/tokenValidator";

const userRoutes: Router = Router();

userRoutes.get("/:userId", authController.getUserData);

export { userRoutes };
