import knex from "knex";
import config from "../../../knexfile";
import { Message } from "../../types";

const knexInstance = knex(config);

const insertNewMessage = async (messageData: Message): Promise<Message> => {
  const newMessage: Message[] = await knexInstance("history")
    .insert(messageData)
    .returning("*");
  return newMessage[0];
};

const selectMessagesByChatId = async (chat_id: number): Promise<Message[]> => {
  const messages: Message[] = await knexInstance("history")
    .select("*")
    .where({ chat_id });

  if (messages.length) {
    return messages.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return messages;
};

const deleteMessageById = async (id: number): Promise<number> => {
  const deleted = await knexInstance("history").delete().where({ id });

  return deleted;
};

export default { insertNewMessage, selectMessagesByChatId, deleteMessageById };
