/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./db.js";
import usersRouter from "./routes/users.js";
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test the database connection when the server starts
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully");
  release();
});

// Routes
app.use("/api", usersRouter);
app.use("/api", indexRouter);

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Server listener
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
