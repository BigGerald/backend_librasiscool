import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("history", (table) => {
    table.increments();
    table.string("content").notNullable();
    table.integer("order").notNullable();
    table.integer("chat_id").notNullable;
    table.foreign("chat_id").references("chats.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("history");
}
