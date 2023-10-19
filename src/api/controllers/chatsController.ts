import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import chatsService from "../services/chatsService";
import historyService from "../services/historyService";
import { Chat } from "../../types";

//precisamos voltar aq depois pravalidar o usuario que esta cadastrando o chat e validar automaticamente
const createChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatData: Chat = req.body;
    chatData.user_id = Number(req.params.userId);
    const newChat = await chatsService.createNewChat(req.body);
    res.status(httpStatus.CREATED).json(newChat);
  } catch (error: unknown) {
    next(error);
  }
};

const getChatData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = Number(req.params.chatId);
    const chatData = await chatsService.findById(chatId);
    res.status(httpStatus.OK).json(chatData);
  } catch (error: unknown) {
    next(error);
  }
};

const getChatMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatId = Number(req.params.chatId);
    const messages = await historyService.getAllMessagesByChat(chatId);
    res.status(httpStatus.OK).json(messages);
  } catch (error: unknown) {
    next(error);
  }
};

const getAllChatsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.userId);
    const chats = await chatsService.getAllChatsByUser(userId);

    res.status(httpStatus.OK).json(chats);
  } catch (error: unknown) {
    next(error);
  }
};

const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = Number(req.params.chatId);
    const newMessage = await historyService.addMessage(
      chatId,
      req.body.content
    );

    res.status(httpStatus.OK).json(newMessage);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  createChat,
  getChatData,
  getChatMessages,
  addMessage,
  getAllChatsByUser,
};
