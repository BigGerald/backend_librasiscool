import httpStatus from "http-status";
import { Chat } from "../../types";
import { makeError } from "../middlewares/errorHandler";
import chatRepository from "../repositories/chatsRepository";
import usersRepository from "../repositories/usersRepository";

const createNewChat = async (chatData: Chat) => {
  const findUser = await usersRepository.findById(chatData.user_id!);
  if (!findUser)
    throw makeError({
      message: "User not found",
      status: httpStatus.BAD_REQUEST,
    });

  const newChat = await chatRepository.insertNewChat(chatData);
  return newChat;
};

const findById = async (id: number) => {
  const chatData = await chatRepository.selectById(id);
  return chatData;
};

export default { createNewChat, findById };
