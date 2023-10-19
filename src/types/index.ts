import { Chat } from "./chatsModels";
import { Message } from "./historyModels";
import { UserDataBase } from "./userModels";

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export { ErrorType, Chat, Message, UserDataBase };
