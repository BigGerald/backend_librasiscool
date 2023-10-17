import { Chat } from "./chatsModels";
import { Message } from "./historyModels";

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export { ErrorType, Chat, Message };
