import config from "../config";
import knex from "knex";

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, OMDB_API_URL, TMDB_API_KEY, TMDB_BASE_URL } = config.env;

const db = knex({
  client: "postgresql",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
  pool: {
    min: 0,
    max: 10,
  },
});
export default {
  db,
  OMDB_API_URL,
  TMDB_API_KEY, 
  TMDB_BASE_URL,
};
