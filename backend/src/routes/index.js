import { Router } from "express";
import { query } from "../db";
import { pool } from "../db.js";
const router = Router();

// Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const result = await query("SELECT * FROM jobs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get applications count for a job
router.get("/job-applications/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await query(
      "SELECT COUNT(*) AS application_count FROM job_applications WHERE job_id = $1",
      [jobId]
    );
    res.json({ applicationCount: result.rows[0].application_count });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if an employee has applied for a job
router.get("/has-applied/:jobId/:employeeWalletAddress", async (req, res) => {
  const { jobId, employeeWalletAddress } = req.params;

  if (!jobId || !employeeWalletAddress) {
    return res
      .status(400)
      .json({ error: "Invalid jobId or employeeWalletAddress" });
  }

  try {
    const result = await query(
      "SELECT COUNT(*) AS count FROM job_applications WHERE job_id = $1 AND employee_wallet_address = $2",
      [parseInt(jobId, 10), employeeWalletAddress]
    );

    const hasApplied = result.rows[0].count > 0;
    res.json({ hasApplied });
  } catch (error) {
    console.error("Error checking job application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Submit a job application
router.post("/apply-job", async (req, res) => {
  const { jobId, employeeWalletAddress, coverLetter } = req.body;

  if (!jobId || !employeeWalletAddress || !coverLetter) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO job_applications (job_id, employee_wallet_address, cover_letter) VALUES ($1, $2, $3) RETURNING *",
      [parseInt(jobId, 10), employeeWalletAddress, coverLetter]
    );

    if (result.rows.length > 0) {
      res.status(201).json({
        message: "Application submitted successfully.",
        application: result.rows[0],
      });
    } else {
      res
        .status(500)
        .json({ error: "Failed to submit application. (submit submit)" });
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if an employee has applied for a job
router.get("/has-applied/:jobId/:employeeWalletAddress", async (req, res) => {
  const { jobId, employeeWalletAddress } = req.params;

  if (!jobId || !employeeWalletAddress) {
    return res
      .status(400)
      .json({ error: "Invalid jobId or employeeWalletAddress" });
  }

  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM job_applications WHERE job_id = $1 AND employee_wallet_address = $2",
      [parseInt(jobId, 10), employeeWalletAddress]
    );

    const hasApplied = result.rows[0].count > 0;
    res.json({ hasApplied });
  } catch (error) {
    console.error("Error checking job application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get jobs posted by the logged-in employer with application counts
app.get("/api/employer-jobs", async (req, res) => {
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
        j.id, 
        j.title, 
        j.description, 
        j.location, 
        j.salary, 
        j.employer, 
        j.transaction_hash, 
        j.created_at,
        COUNT(ja.id) AS application_count
      FROM 
        jobs j
      LEFT JOIN 
        job_applications ja 
      ON 
        j.id = ja.job_id
      WHERE 
        j.employer = $1
      GROUP BY 
        j.id
      ORDER BY 
        j.created_at DESC
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
