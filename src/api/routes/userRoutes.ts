import { Router } from "express";
import authController from "../controllers/authController";
import { tokenValidator } from "../middlewares/tokenValidator";
import chatsController from "../controllers/chatsController";

const userRoutes: Router = Router();

userRoutes.get("/", authController.showAllUsers);

userRoutes.get("/info", tokenValidator, authController.getUserData);

userRoutes.get("/chats/:chatId", tokenValidator, chatsController.getChatData);

userRoutes.get(
  "/chats/:chatId/messages",
  tokenValidator,
  chatsController.getChatMessages
);

userRoutes.get("/chats", tokenValidator, chatsController.getAllChatsByUser);

userRoutes.post("/register", authController.register);

userRoutes.post("/login", authController.login);

userRoutes.post("/chats", tokenValidator, chatsController.createChat);

userRoutes.post(
  "/chats/:chatId/messages",
  tokenValidator,
  chatsController.addMessage
);

userRoutes.delete(
  "/chats/delete/:chatId",
  tokenValidator,
  chatsController.deleteChat
);

export { userRoutes };
