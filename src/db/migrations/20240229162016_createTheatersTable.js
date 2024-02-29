
exports.up = function(knex) {
    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary(); // sets primary key as 'theater_id'. unique ID.
        table.string("name"); // name of the theater with a data type of string
        table.string("address_line_1"); // first line of address of the theater. data type: string.
        table.string("address_line_2"); // second line of address of the theater. data type: string.
        table.string("city"); // city in which the theater is located. data type: string.
        table.string("state"); // state in which the theater is located. data type: string.
        table.string("zip"); // the zip in which the theater is located. data type: string.
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("theaters");
};
