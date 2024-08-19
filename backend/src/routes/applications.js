import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Get all applications for a specific employer
router.get("/employer-applications", async (req, res) => {
  const { employerWalletAddress } = req.query;
  try {
    const result = await pool.query(
      `SELECT Applications.*, Jobs.title AS job_title 
       FROM Applications 
       JOIN Jobs ON Applications.job_id = Jobs.job_id 
       WHERE Jobs.employer = $1 
       ORDER BY Applications.timestamp DESC`,
      [employerWalletAddress]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get the count of applications for a specific job
router.get("/job-applications/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS application_count FROM Applications WHERE job_id = $1",
      [jobId]
    );
    res.json({ applicationCount: result.rows[0].application_count });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Apply for a job
router.post("/apply-job", async (req, res) => {
  const { jobId, applicant, resumeId, timestamp, coverLetter } = req.body;

  if (!jobId || !applicant || !resumeId || !timestamp) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Applications (job_id, applicant, resume_id, timestamp, cover_letter) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [jobId, applicant, resumeId, timestamp, coverLetter || null] // Insert coverLetter if provided, else null
    );

    if (result.rows.length > 0) {
      res.status(201).json({
        message: "Application submitted successfully.",
        application: result.rows[0],
      });
    } else {
      res.status(500).json({ error: "Failed to submit application." });
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Check if a specific employee has already applied for a specific job
router.get("/has-applied/:jobId/:applicant", async (req, res) => {
  const { jobId, applicant } = req.params;

  // Add debug logs
  console.log("Job ID:", jobId);
  console.log("Applicant:", applicant);

  if (!jobId || !applicant) {
    return res
      .status(400)
      .json({ error: "Invalid jobId or applicant address" });
  }

  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM Applications WHERE job_id = $1 AND applicant = $2",
      [jobId, applicant]
    );

    const hasApplied = result.rows[0].count > 0;
    res.json({ hasApplied });
  } catch (error) {
    console.error("Error checking application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
