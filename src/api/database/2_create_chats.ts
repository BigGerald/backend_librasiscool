import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("chats", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("chats");
}
