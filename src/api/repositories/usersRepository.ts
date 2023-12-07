import knex from "knex";
import config from "../../../knexfile";
import { UserDataBase } from "../../types";

const knexInstance = knex(config);

const index = async () => {
  const users = await knexInstance("users").select("*");

  return users;
};

const create = async (userData: UserDataBase): Promise<UserDataBase> => {
  const user = await knexInstance("users").insert(userData).returning(["*"]);
  return user[0];
};

const findById = async (id: number) => {
  const userData = await knexInstance("users").select("*").where({ id });
  return userData[0];
};

const findByUserName = async (name: String): Promise<UserDataBase> => {
  const userData = await knexInstance("users").select("*").where({ name });
  return userData[0];
};

export default {
  index,
  findById,
  findByUserName,
  create,
};
