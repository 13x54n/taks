import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const defaultQuestions = [
  "Wave your hand.",
  "Show your left hand.",
  "Touch your nose.",
  "Blink three times.",
];

async function initializeQuestions() {
  try {
    const existingQuestions = await pool.query(
      "SELECT question FROM questions"
    );
    const existingQuestionsSet = new Set(
      existingQuestions.rows.map((row) => row.question)
    );

    for (const question of defaultQuestions) {
      if (!existingQuestionsSet.has(question)) {
        await pool.query("INSERT INTO questions (question) VALUES ($1)", [
          question,
        ]);
      }
    }
  } catch (error) {
    console.error("Error initializing questions:", error);
  }
}

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(port, async () => {
  await initializeQuestions();
  console.log(`Server running on port ${port}`);
});
