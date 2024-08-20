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

// Apply for a job
router.post("/apply-job", async (req, res) => {
  const { jobId, applicant, resumeId, coverLetter, timestamp } = req.body;

  if (!jobId || !applicant || !resumeId || !timestamp) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Applications (job_id, applicant, resume_id, cover_letter, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [jobId, applicant, resumeId, coverLetter, timestamp]
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

// Mark an applicant as hired
// Update the hire-applicant route in your application.js

router.post("/hire-applicant", async (req, res) => {
  const { jobId, applicant } = req.body;

  if (!jobId || !applicant) {
    return res
      .status(400)
      .json({ error: "Invalid jobId or applicant address" });
  }

  try {
    // Update the application to mark the applicant as hired
    const updateApplication = await pool.query(
      "UPDATE Applications SET hired = TRUE WHERE job_id = $1 AND applicant = $2 RETURNING *",
      [jobId, applicant]
    );

    if (updateApplication.rows.length > 0) {
      // Update the job to mark it as filled
      await pool.query("UPDATE Jobs SET is_filled = TRUE WHERE job_id = $1", [
        jobId,
      ]);

      res.status(200).json({
        message: "Applicant hired successfully",
        application: updateApplication.rows[0],
      });
    } else {
      res.status(500).json({ error: "Failed to hire applicant" });
    }
  } catch (error) {
    console.error("Error hiring applicant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to hire an applicant
// router.post("/hire-applicant", async (req, res) => {
//   const { jobId, applicant } = req.body;

//   if (!jobId || !applicant) {
//     return res
//       .status(400)
//       .json({ error: "Invalid jobId or applicant address" });
//   }

//   try {
//     // Update the job to mark it as filled and set the employee
//     const result = await pool.query(
//       "UPDATE Jobs SET is_filled = TRUE, employee = $1 WHERE job_id = $2 RETURNING *",
//       [applicant, jobId]
//     );

//     if (result.rows.length > 0) {
//       res
//         .status(200)
//         .json({ message: "Applicant hired successfully", job: result.rows[0] });
//     } else {
//       res.status(500).json({ error: "Failed to hire applicant" });
//     }
//   } catch (error) {
//     console.error("Error hiring applicant:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Check if a specific employee has already applied for a specific job
router.get("/has-applied/:jobId/:applicant", async (req, res) => {
  const { jobId, applicant } = req.params;

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

// Get all applications for a specific employee
router.get("/employee-applications", async (req, res) => {
  const { employeeWalletAddress } = req.query;
  try {
    const result = await pool.query(
      `SELECT Applications.*, Jobs.title AS job_title, Jobs.description, Jobs.payment, Jobs.employer, Jobs.is_filled AS is_hired, Jobs.eligible_for_flash_loans 
       FROM Applications 
       JOIN Jobs ON Applications.job_id = Jobs.job_id 
       WHERE Applications.applicant = $1 
       ORDER BY Applications.timestamp DESC`,
      [employeeWalletAddress]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employee applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Request flash loan for a job
router.post("/request-flash-loan", async (req, res) => {
  const { jobId, employee, loanAmount } = req.body;

  if (!jobId || !employee || !loanAmount) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  try {
    // Implement flash loan logic here
    res.status(201).json({ message: "Flash loan requested successfully." });
  } catch (error) {
    console.error("Error requesting flash loan:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint for getting flash-loan-data

router.get("/flash-loan-data", async (req, res) => {
  try {
    const result = await pool.query(`
          SELECT
              job_id AS _id,
              title,
              payment AS "totalAmount",
              (payment * 0.5) AS "flashLoanAmount",
              is_filled,
              employer AS "employee",
              employee AS "assignedTo"
          FROM Jobs
          WHERE eligible_for_flash_loans = TRUE
      `);

    const data = result.rows.map((job) => ({
      ...job,
      isLoanTaken: job.is_filled, // Assuming 'is_filled' indicates whether the loan is taken
    }));

    res.json(data);
  } catch (error) {
    console.error("Error fetching flash loan data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
