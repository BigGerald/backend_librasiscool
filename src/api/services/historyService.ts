import { Chat } from "./../../types/chatsModels";
import httpStatus from "http-status";
import historyRepository from "../repositories/historyRepository";
import { Message } from "../../types";
import chatsRepository from "../repositories/chatsRepository";
import { makeError } from "../middlewares/errorHandler";

const addMessage = async (
  chat_id: number,
  content: string
): Promise<Message> => {
  const messageData: Message = {};
  const findChat = await chatsRepository.selectById(chat_id!);
  if (!findChat) {
    throw makeError({
      message: "Chat not found",
      status: httpStatus.BAD_REQUEST,
    });
  }
  messageData.content = content;
  messageData.chat_id = chat_id;
  messageData.order =
    (await historyRepository.selectMessagesByChatId(chat_id)).length + 1;

  const newMessage = await historyRepository.insertNewMessage(messageData);

  return newMessage;
};

const getAllMessagesByChat = async (chat_id: number): Promise<Message[]> => {
  const findChat = await chatsRepository.selectById(chat_id!);
  if (!findChat) {
    throw makeError({
      message: "Chat not found",
      status: httpStatus.BAD_REQUEST,
    });
  }

  const messages = await historyRepository.selectMessagesByChatId(chat_id);

  return messages;
};

export default { addMessage, getAllMessagesByChat };
