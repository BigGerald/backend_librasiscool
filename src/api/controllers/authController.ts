import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const showAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await authService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  showAllUsers,
};
