import { Router } from "express";
import chatsController from "../controllers/chatsController";

const chatsRoutes: Router = Router();

chatsRoutes.get("/:chatId", chatsController.getChatData);

chatsRoutes.get("/:chatId/messages", chatsController.getChatMessages);

chatsRoutes.post("/", chatsController.createChat);

chatsRoutes.post("/:chatId/messages", chatsController.addMessage);

export { chatsRoutes };
