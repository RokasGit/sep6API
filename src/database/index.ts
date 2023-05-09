import config from "../config";
import knex from "knex";

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  OMDB_API_URL,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} = config.env;

const db = knex({
  client: "postgresql",
  connection: {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
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
