const knex = require("../db/connection"); // requires Knex instance that is initialized in db/connection.js

// This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.
function list() { // GET all /movies endpoint
    return knex("movies").select("*"); // knex query from movies table and return list of all movies
}

function read(movie_id) { // GET /movies/:movieId endpoint
    return knex("movies").select("*").where({ movie_id }).first();
}

// GET movies
/* ```json
{
    "data": [
      {
        "id": 1,
        "title": "Spirited Away",
        "runtime_in_minutes": 125,
        "rating": "PG",
        "description": "Chihiro ...",
        "image_url": "https://imdb-api.com/..."
      }
      // ...
    ]
  } 
  */

// GET /movies?is_showing=true
// In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters._ This means you will need to check the `movies_theaters` table.

// READ one movie
// this route will return a single movie by ID
/* four cases to consider
- `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews`
*/

// GET /movies/:movieId
/* response should look like this: 
```json
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
```
*/

// GET /movies/:movieId (incorrect ID)
/* 
If the given ID does not match an existing movie, a response like the following should be returned:

```json
{
  "error": "Movie cannot be found."
}
```

The response _must_ have `404` as the status code.

*/

// GET /movies/:movieId/theaters
// this route should return all 'theaters' where the movie is playing. that means you need to check 'movies_theaters' table

// GET /movies/:movieId/reviews
// this route should return all the 'reviews' for the movie, including all the 'critic' details added to a 'critic' key of the review
module.exports = {
    list,
    read,
}