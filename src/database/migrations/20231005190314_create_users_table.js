require("dotenv").config();

exports.up = function(knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id");
        table.string("name", 255).notNullable();
        table.string("email", 100).notNullable().unique();
        table.string("password", 255).notNullable();
        table.string("address", 255).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
