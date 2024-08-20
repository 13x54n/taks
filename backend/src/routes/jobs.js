import { Router } from "express";
import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Create a new job
router.post("/create-job", async (req, res) => {
  const {
    title,
    description,
    payment,
    expiry_time,
    employer,
    transaction_hash,
  } = req.body; // Get transaction_hash from the request body
  const job_id = uuidv4(); // Generate UUID for job ID
  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

  if (!transaction_hash) {
    return res.status(400).json({ error: "Transaction hash is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Jobs (job_id, title, description, employer, payment, timestamp, expiry_time, transaction_hash) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        job_id,
        title,
        description,
        employer,
        payment,
        timestamp,
        expiry_time,
        transaction_hash, // Use the transaction_hash from the request body
      ]
    );

    res.status(201).json(result.rows[0]); // Return the created job
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM Jobs ORDER BY timestamp DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get jobs posted by a specific employer with application counts
router.get("/employer-jobs", async (req, res) => {
  const { employerWalletAddress } = req.query;

  if (!employerWalletAddress) {
    return res
      .status(400)
      .json({ error: "Employer wallet address is required" });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        j.job_id, 
        j.title, 
        j.description, 
        j.payment, 
        j.employer, 
        j.transaction_hash, 
        j.timestamp,
        COUNT(a.application_id) AS application_count
      FROM 
        Jobs j
      LEFT JOIN 
        Applications a 
      ON 
        j.job_id = a.job_id
      WHERE 
        j.employer = $1
      GROUP BY 
        j.job_id
      ORDER BY 
        j.timestamp DESC
    `,
      [employerWalletAddress]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employer jobs with applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
