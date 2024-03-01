
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary(); // sets critics_id as primary key, unique id
    table.string("preferred_name"); // the critic's preferred first name that has a data type of string
    table.string("surname"); // the critic's last name that has a data type of string
    table.string("organization_name"); // the name of the organization the critic works for. data type is string
    table.timestamps(true, true); // add 'created_at' and 'updated_at' columns. this will help keep track of the table's records.
  });
};

exports.down = function(knex) { 
    return knex.schema.dropTable("critics"); // drop critics table if exports.down gets invoked when you undo migrations
};
