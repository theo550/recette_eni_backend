const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Crée la table au démarrage
pool.query(`
  CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    time INT,
    description VARCHAR(100) UNIQUE
  )
`);

module.exports = {
    recipes: async () => {
        const { rows } = await pool.query("SELECT * FROM recipes");
        return rows;
    },
    recipe: async ({ id }) => {
        const { rows } = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
        return rows[0];
    },
    createRecipe: async ({ name, time, description }) => {
        const { rows } = await pool.query(
            "INSERT INTO recipes (name, time, description) VALUES ($1, $2, $3) RETURNING *",
            [name, time, description]
        );
        return rows[0];
    },
};