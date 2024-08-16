// src/db.js
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "everest",
  host: "dpg-cqj92ruehbks73c8559g-a.oregon-postgres.render.com",
  database: "eth_kmqr",
  password: "RlPomw3oErXYYuwgBbhDoP6cuy7hjzX2",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
