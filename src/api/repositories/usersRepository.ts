import knex from "knex";
import config from "../../../knexfile";

const knexInstance = knex(config);

const index = async () => {
  const users = await knexInstance("users").select("*");

  return users;
};

const findById = async (id: number) => {
  const userData = await knexInstance("users").select("*").where({ id });

  return userData[0];
};

export default {
  index,
  findById,
};
