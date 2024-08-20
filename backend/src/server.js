/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./db.js";
import usersRouter from "./routes/users.js";
import indexRouter from "./routes/index.js";
import multer from "multer";
import crypto from "crypto";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });

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

// Endpoint to get random questions
app.get("/api/questions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT question FROM questions ORDER BY RANDOM() LIMIT 5"
    );
    const questions = result.rows.map((row) => row.question);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions from database:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Endpoint to upload video and save hash and questions
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    const { user_id, role, questions } = req.body;

    if (!user_id || !role || !questions) {
      return res.status(400).json({
        error: "User ID (wallet address), Role, and Questions are required",
      });
    }

    // Check if user_id exists in the users table
    const userCheck = await pool.query(
      "SELECT user_id FROM users WHERE user_id = $1",
      [user_id]
    );
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    // Calculate the hash of the video
    const videoBuffer = req.file.buffer;
    const videoHash = crypto
      .createHash("sha256")
      .update(videoBuffer)
      .digest("hex");

    // Insert the video hash and related data into the verifications table
    const result = await pool.query(
      `INSERT INTO verifications (user_id, role, video_hash, timestamp, verified, questions)
       VALUES ($1, $2, $3, NOW(), false, $4::jsonb)
       RETURNING *`,
      [user_id, role, videoHash, JSON.stringify(questions)]
    );

    res.status(200).json({
      message: "Video uploaded and hash saved with questions",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving video hash and questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Server listener
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
