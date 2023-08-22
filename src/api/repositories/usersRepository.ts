import knex from "knex";
import config from "../../../knexfile";

const knexInstance = knex(config);

const index = async () => {
  const users = await knexInstance("user").select("*");

  return users;
};

export default {
  index,
};
