import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const tokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token!, "K7s9P3x2Y5");
    next();
  } catch (error) {
    next(error);
  }
};
