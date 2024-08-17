import { Router } from "express";
import pool from "../db.js";

const router = Router();

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
