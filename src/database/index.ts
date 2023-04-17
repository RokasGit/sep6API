import config from "../config"
import knex from "knex"

const {DB_USER, DB_PASS, DB_NAME, DB_HOST, OMDB_API_URL } = config.env;

const db = knex({
    client: 'postgresql',
    connection: {
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASS,
        database:DB_NAME
    },
    pool: {
        min: 0,
        max:10
    }
});
export default  {
    db,
    OMDB_API_URL
}

