import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/employer-applications", async (req, res) => {
  const { employerWalletAddress } = req.query;
  try {
    const result = await pool.query(
      `SELECT job_applications.*, jobs.title AS job_title 
       FROM job_applications 
       JOIN jobs ON job_applications.job_id = jobs.id 
       WHERE jobs.employer = $1 
       ORDER BY job_applications.created_at DESC`,
      [employerWalletAddress]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/job-applications/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS application_count FROM job_applications WHERE job_id = $1",
      [jobId]
    );
    res.json({ applicationCount: result.rows[0].application_count });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/apply-job", async (req, res) => {
  const { jobId, employeeWalletAddress, coverLetter, resumeLink } = req.body;

  if (!jobId || !employeeWalletAddress || !coverLetter) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO job_applications (job_id, employee_wallet_address, cover_letter, resume_link) VALUES ($1, $2, $3, $4) RETURNING *",
      [jobId, employeeWalletAddress, coverLetter, resumeLink]
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
    console.error("Error details:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

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

export default router;
