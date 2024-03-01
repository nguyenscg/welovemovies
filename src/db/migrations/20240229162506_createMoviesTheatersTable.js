
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable(); // prevents negative values from being inserted to movie_id. movie_id cannot be null.
    table
        .foreign("movie_id") // create foreign key constraint: movie_id
        .references("movie_id") // references primary key
        .inTable("movies") // of movies table
        .onDelete("CASCADE");
    table.integer("theater_id").unsigned().notNullable(); // prevents negative values from being inserted to theater_id. theater_id cannot be null.
    table
        .foreign("theater_id") // create foreign key called theater_id
        .references("theater_id") // references primary key 'theater_id'
        .inTable("theaters") // of theaters table
        .onDelete("CASCADE"); // if theater gets deleted, all movies will be deleted from database as well
    table.boolean("is_showing");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
