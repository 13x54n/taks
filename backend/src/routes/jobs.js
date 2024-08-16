import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Route to get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create-job", async (req, res) => {
  const { title, description, location, salary, employer, transactionHash } =
    req.body;

  if (
    !title ||
    !description ||
    !location ||
    !salary ||
    !employer ||
    !transactionHash
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO jobs (title, description, location, salary, employer, transaction_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, description, location, salary, employer, transactionHash]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/employer-jobs", async (req, res) => {
  const { employerWalletAddress } = req.query;
  try {
    const result = await pool.query(
      "SELECT jobs.*, COUNT(job_applications.id) AS application_count FROM jobs LEFT JOIN job_applications ON jobs.id = job_applications.job_id WHERE employer = $1 GROUP BY jobs.id ORDER BY created_at DESC",
      [employerWalletAddress]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
