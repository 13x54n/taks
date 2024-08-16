import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jobsRouter from "./routes/jobs.js";
import applicationsRouter from "./routes/applications.js";
import dotenv from "dotenv";
import pool from "./db.js"; // Import the database connection
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test the database connection when the server starts
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully");
  release(); // release the client back to the pool
});

// Routes
app.use("/api", usersRouter);
app.use("/api", jobsRouter);
app.use("/api", applicationsRouter);

// Server listener
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import multer, { memoryStorage } from "multer";
// import fetch from "node-fetch";
// import { createHash } from "crypto";
// import pkg from "pg";

// const { Pool } = pkg;

// const app = express();
// // eslint-disable-next-line no-undef
// const PORT = process.env.PORT || 3001;

// // PostgreSQL connection
// const pool = new Pool({
//   user: "everest",
//   host: "dpg-cqj92ruehbks73c8559g-a.oregon-postgres.render.com",
//   database: "eth_kmqr",
//   password: "RlPomw3oErXYYuwgBbhDoP6cuy7hjzX2",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(bodyParser.json());

// const storage = memoryStorage();
// const upload = multer({ storage: storage });

// // Endpoint to verify reCAPTCHA
// app.post("/verify-recaptcha", async (req, res) => {
//   const { token, version } = req.body;
//   const secretKey =
//     version === "v3" ? RECAPTCHA_SECRET_V3 : RECAPTCHA_SECRET_V2;

//   try {
//     const response = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `secret=${secretKey}&response=${token}`,
//       }
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error verifying reCAPTCHA:", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Failed to verify reCAPTCHA" });
//   }
// });

// // Endpoint to get random questions
// app.get("/questions", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT question FROM questions ORDER BY RANDOM() LIMIT 10"
//     );
//     const questions = result.rows.map((row) => row.question);
//     res.json(questions);
//   } catch (error) {
//     console.error("Error fetching questions from database:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Endpoint to upload video and save hash
// app.post("/upload", upload.single("video"), async (req, res) => {
//   if (!req.file || !req.body.question) {
//     return res.status(400).send("No file or question provided.");
//   }

//   const videoBuffer = req.file.buffer;
//   const hash = createHash("sha256").update(videoBuffer).digest("hex");
//   const question = req.body.question;

//   try {
//     await pool.query(
//       "INSERT INTO video_hashes (hash, question) VALUES ($1, $2)",
//       [hash, question]
//     );
//     res.status(200).send("Video uploaded and hash saved.");
//   } catch (error) {
//     console.error("Error saving hash to database:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Endpoint to save user role and wallet address
// app.post("/api/save-role", async (req, res) => {
//   const { walletAddress, role } = req.body;

//   if (!walletAddress || !role) {
//     return res
//       .status(400)
//       .json({ error: "Wallet address and role are required." });
//   }

//   try {
//     // Check if the address already exists
//     const result = await pool.query(
//       "SELECT role FROM roles WHERE wallet_address = $1",
//       [walletAddress]
//     );

//     if (result.rows.length > 0) {
//       // If the address exists, return a message indicating the role and walletAddress
//       return res.status(200).json({
//         message: `Address ${walletAddress} is already joined as ${result.rows[0].role}.`,
//         alreadyJoined: true,
//         role: result.rows[0].role,
//       });
//     } else {
//       // If the address does not exist, insert it into the database
//       await pool.query(
//         "INSERT INTO roles (wallet_address, role) VALUES ($1, $2)",
//         [walletAddress, role]
//       );
//       return res.status(200).json({
//         message: "Role saved successfully.",
//         alreadyJoined: false,
//         walletAddress,
//         role,
//       });
//     }
//   } catch (error) {
//     console.error("Error saving role to database:", error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Endpoint to get the role of the user
// app.get("/api/get-role", async (req, res) => {
//   const { walletAddress } = req.query;
//   console.log(walletAddress);

//   if (!walletAddress) {
//     return res.status(400).json({ error: "Wallet address is required." });
//   }

//   try {
//     const result = await pool.query(
//       "SELECT role FROM roles WHERE wallet_address = $1",
//       [walletAddress]
//     );

//     if (result.rows.length > 0) {
//       return res.status(200).json({ role: result.rows[0].role });
//     } else {
//       return res.status(404).json({ error: "Role not found." });
//     }
//   } catch (error) {
//     console.error("Error fetching role from database:", error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Endpoint to create a new job
// app.post("/api/create-job", async (req, res) => {
//   const { title, description, location, salary, employer, transactionHash } =
//     req.body;

//   if (
//     !title ||
//     !description ||
//     !location ||
//     !salary ||
//     !employer ||
//     !transactionHash
//   ) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO jobs (title, description, location, salary, employer, transaction_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [title, description, location, salary, employer, transactionHash]
//     );
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error("Error creating job:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Get Jobs from the database
// app.get("/api/jobs", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM jobs ORDER BY created_at DESC"
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Endpoint to submit a job application
// app.post("/api/apply-job", async (req, res) => {
//   const { jobId, employeeWalletAddress, coverLetter, resumeLink } = req.body;

//   if (!jobId || !employeeWalletAddress || !coverLetter) {
//     return res
//       .status(400)
//       .json({ error: "All required fields must be provided." });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO job_applications (job_id, employee_wallet_address, cover_letter, resume_link) VALUES ($1, $2, $3, $4) RETURNING *",
//       [jobId, employeeWalletAddress, coverLetter, resumeLink]
//     );

//     if (result.rows.length > 0) {
//       res.status(201).json({
//         message: "Application submitted successfully.",
//         application: result.rows[0],
//       });
//     } else {
//       res.status(500).json({ error: "Failed to submit application." });
//     }
//   } catch (error) {
//     console.error("Error details:", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// });

// // Endpoint to get applications count for a job
// app.get("/api/job-applications/:jobId", async (req, res) => {
//   const { jobId } = req.params;

//   try {
//     const result = await pool.query(
//       "SELECT COUNT(*) AS application_count FROM job_applications WHERE job_id = $1",
//       [jobId]
//     );
//     res.json({ applicationCount: result.rows[0].application_count });
//   } catch (error) {
//     console.error("Error fetching job applications:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Endpoint to check if an employee has applied for a job
// app.get("/api/has-applied/:jobId/:employeeWalletAddress", async (req, res) => {
//   const { jobId, employeeWalletAddress } = req.params;

//   // Check if jobId and employeeWalletAddress are correctly passed
//   if (!jobId || !employeeWalletAddress) {
//     return res
//       .status(400)
//       .json({ error: "Invalid jobId or employeeWalletAddress" });
//   }

//   try {
//     const result = await pool.query(
//       "SELECT COUNT(*) AS count FROM job_applications WHERE job_id = $1 AND employee_wallet_address = $2",
//       [parseInt(jobId, 10), employeeWalletAddress]
//     );

//     const hasApplied = result.rows[0].count > 0;
//     res.json({ hasApplied });
//   } catch (error) {
//     console.error("Error checking job application status:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port: ${PORT}`);
// });
