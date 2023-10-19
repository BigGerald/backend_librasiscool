import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import httpStatus from "http-status";

const showAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await authService.getAllUsers();
    res.status(httpStatus.OK).json(allUsers);
  } catch (error: unknown) {
    next(error);
  }
};

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await authService.getUserData(Number(req.params.userId));
    res.status(httpStatus.OK).json(userData);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  showAllUsers,
  getUserData,
};
