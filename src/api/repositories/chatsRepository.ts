import knex from "knex";
import config from "../../../knexfile";
import { Chat } from "../../types";
import { all } from "axios";

const knexInstance = knex(config);

const indexByUser = async (user_id: number): Promise<Chat[]> => {
  const allChats: Chat[] = await knexInstance("chats")
    .select("*")
    .where({ user_id });

  if (allChats[0])
    return allChats.sort(
      (a, b) => (b.created_at?.getTime() || 0) - (a.created_at?.getTime() || 0)
    );

  return allChats;
};

const insertNewChat = async (chatData: Chat): Promise<Chat> => {
  const newChat: Chat[] = await knexInstance("chats")
    .insert(chatData)
    .returning("*");
  return newChat[0];
};

const selectById = async (id: number): Promise<Chat> => {
  const chatInfo: Chat[] = await knexInstance("chats")
    .select("*")
    .where({ id });
  return chatInfo[0];
};

const deleteChat = async (id: number) => {
  await knexInstance.transaction(async (trx) => {
    // Primeiro, exclua todas as mensagens associadas a este chat no histórico
    await trx("history").where("chat_id", id).del();

    // Em seguida, exclua o chat em si
    await trx("chats").where("id", id).del();

    // Confirme a transação, o que aplicará as exclusões no banco de dados
    await trx.commit();
  });
};

export default { insertNewChat, selectById, indexByUser, deleteChat };
