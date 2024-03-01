
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary(); // sets the review_id as a primary key. unique ID
        table.text("content"); // content of the review, written in markdown
        table.integer("score"); // a numerical representation of the score given to the movie by the critic
        table.integer("critic_id").unsigned().notNullable();
        table
            .foreign("critic_id") // foreign key | a reference ID to a particular critic
            .references("critic_id")
            .inTable("critics")
            .onDelete("CASCADE");
        table.integer("movie_id").unsigned().notNullable();
        table
            .foreign("movie_id") // foreign key | a reference ID to a particular movie
            .references("movie_id")
            .inTable("movies")
            .onDelete("CASCADE");
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
