import httpStatus from "http-status";
import usersRepository from "../repositories/usersRepository";
import { errorHandler, makeError } from "../middlewares/errorHandler";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserDataBase } from "../../types";
import { number } from "yup";

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

const register = async (userData: UserDataBase): Promise<UserDataBase> => {
  const findUser = await usersRepository.findByUserName(userData.name);
  if (findUser)
    throw makeError({
      message: "Usuario ja cadastrado",
      status: httpStatus.BAD_REQUEST,
    });
  userData.password = await bcrypt.hash(userData.password, 10);
  const newUser = await usersRepository.create(userData);
  return newUser;
};

const login = async (user: UserDataBase) => {
  const findUser = await usersRepository.findByUserName(user.name);

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 400,
    });
  }
  console.log(findUser);
  console.log(user.password);
  const verifyPassword = await bcrypt.compare(user.password, findUser.password);

  if (!verifyPassword) {
    throw makeError({
      message: "Wrong Password",
      status: 401,
    });
  }

  const mySecret = process.env.SECRET ?? "testeDeDesenvolvimento";

  const newToken = jwt.sign(findUser, mySecret, { expiresIn: "1d" });

  return newToken;
};

const getTokenData = async (
  token: string
): Promise<{ id: number; name: string }> => {
  const tokenData: any = jwt.verify(token, process.env.SECRET!);
  return {
    id: tokenData.id,
    name: tokenData.name,
  };
};
export default {
  getAllUsers,
  getUserData,
  register,
  login,
  getTokenData,
};
