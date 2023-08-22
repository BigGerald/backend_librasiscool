import usersRepository from "../repositories/usersRepository";
import { makeError } from "../middlewares/errorHandler";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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

export default {
  getAllUsers,
};
