import { Router } from "express";
import authController from "../controllers/authController";
import { tokenValidator } from "../middlewares/tokenValidator";
import chatsController from "../controllers/chatsController";

const userRoutes: Router = Router();

userRoutes.get("/", authController.showAllUsers);

userRoutes.get("/:userId", authController.getUserData);

userRoutes.get("/:userId/chats/:chatId", chatsController.getChatData);

userRoutes.get(
  "/:userId/chats/:chatId/messages",
  chatsController.getChatMessages
);

userRoutes.get("/:userId/chats", chatsController.getAllChatsByUser);

userRoutes.post("/:userId/chats", chatsController.createChat);

userRoutes.post("/:userId/chats/:chatId/messages", chatsController.addMessage);

export { userRoutes };
