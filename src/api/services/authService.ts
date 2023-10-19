import httpStatus from "http-status";
import usersRepository from "../repositories/usersRepository";
import { makeError } from "../middlewares/errorHandler";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserDataBase } from "../../types";

dotenv.config();

const mySecret = process.env.SECRET!;

const getAllUsers = async () => {
  const users = await usersRepository.index();

  if (!users) {
    throw makeError({
      message: "Error getting Users",
      status: 200,
    });
  }

  return users;
};

const getUserData = async (userId: number): Promise<UserDataBase> => {
  const userData = await usersRepository.findById(userId);

  if (!userData) {
    throw makeError({
      message: "user not found",
      status: httpStatus.BAD_REQUEST,
    });
  }

  return userData;
};
export default {
  getAllUsers,
  getUserData,
};
