// /* eslint-disable no-undef */
// import express from "express";
// import multer from "multer";
// import crypto from "crypto";
// import pkg from "pg";
// import cors from "cors";

// const { Pool } = pkg;

// const app = express();
// const port = 3001;

// app.use(cors());

// const pool = new Pool({
//   user: "everest",
//   host: "dpg-cqj92ruehbks73c8559g-a.oregon-postgres.render.com",
//   database: "eth_kmqr",
//   password: "RlPomw3oErXYYuwgBbhDoP6cuy7hjzX2",
//   port: 5432,
// });

// pool.on("error", (err) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Endpoint to get random questions
// app.get("/api/questions", async (req, res) => {
//   try {
//     console.log("res:", res); // Check what res is
//     const result = await pool.query(
//       "SELECT question FROM questions ORDER BY RANDOM() LIMIT 5"
//     );
//     const questions = result.rows.map((row) => row.question);
//     res.json(questions);
//   } catch (error) {
//     console.error("Error fetching questions from database:", error);
//     res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// // Endpoint to upload video and save hash
// app.post("/upload", upload.single("video"), async (req, res) => {
//   if (!req.file || !req.body.question) {
//     return res.status(400).send("No file or question provided.");
//   }

//   const videoBuffer = req.file.buffer;
//   const hash = crypto.createHash("sha256").update(videoBuffer).digest("hex");
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

// app.listen(port, () => {
//   console.log(`Server running on portssss ${port}`);
// });
