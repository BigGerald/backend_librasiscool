import { Router } from "express";
import authController from "../controllers/authController";
import { tokenValidator } from "../middlewares/tokenValidator";
import { chatsRoutes } from "./chatsRoutes";

const userRoutes: Router = Router();

userRoutes.use("/:userId/chats", chatsRoutes);
userRoutes.get("/", authController.showAllUsers);

export { userRoutes };
