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
    const tokenData = await authService.getTokenData(
      req.headers.authorization?.split(" ")[1]!
    );
    const userData = await authService.getUserData(tokenData.id);
    res.status(httpStatus.OK).json(userData);
  } catch (error: unknown) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.login({
      name: req.body.name,
      password: req.body.password,
    });
    res.status(httpStatus.ACCEPTED).json(token);
  } catch (error: unknown) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await authService.register({
      name: req.body.name,
      password: req.body.password,
    });
    res.status(httpStatus.ACCEPTED).json(userData);
  } catch (error: unknown) {
    next(error);
  }
};

const getTokenData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await authService.getTokenData(
      req.headers.authorization?.split(" ")[1]!
    );
    res.status(httpStatus.ACCEPTED).json(userData);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  showAllUsers,
  getUserData,
  login,
  getTokenData,
  register,
};
