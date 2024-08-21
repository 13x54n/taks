import { Router } from "express";
import pool from "../db.js";

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
    job_id,
    eligible_for_flash_loans,
  } = req.body;

  const timestamp = Math.floor(Date.now() / 1000);

  if (!transaction_hash) {
    return res.status(400).json({ error: "Transaction hash is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Jobs (job_id, title, description, employer, payment, timestamp, expiry_time, transaction_hash, eligible_for_flash_loans) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        job_id,
        title,
        description,
        employer,
        payment,
        timestamp,
        expiry_time,
        transaction_hash,
        eligible_for_flash_loans, // Ensure this value is correctly passed
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
      `SELECT 
          j.job_id, 
          j.title, 
          j.description, 
          j.employer, 
          j.payment, 
          j.is_filled, 
          j.employee, 
          j.timestamp, 
          j.expiry_time, 
          j.eligible_for_flash_loans, 
          j.transaction_hash,
          COUNT(a.application_id) AS application_count
       FROM 
          Jobs j
       LEFT JOIN 
          Applications a 
       ON 
          j.job_id = a.job_id
       GROUP BY 
          j.job_id
       ORDER BY 
          j.timestamp DESC`
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
