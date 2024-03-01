
exports.up = function(knex) {
    return knex.schema.createTable("movies", (table) => {
        table.incremenets("movie_id").primary(); // sets 'movies_id' as primary key; unique ID
        table.string("title"); // the title of the movie. data type: string
        table.integer("runtime_in_minutes"); // length of the movie in minutes. data type: integer
        table.string("rating"); // rating given to the movie. data type: string
        table.string("description"); // a shortened description of the movie. data type: string
        table.string("image_url"); // a url to the movie's poster. data type: string
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};
