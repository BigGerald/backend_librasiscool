import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { tokenValidator } from "../middlewares/tokenValidator";
import authController from "../controllers/authController";

const router: Router = Router();
router.use("/users", userRoutes);
router.post("/token", tokenValidator, authController.getTokenData);
export { router };
