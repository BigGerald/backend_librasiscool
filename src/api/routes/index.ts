import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { chatsRoutes } from "./chatsRoutes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/chats", chatsRoutes);

export { router };
