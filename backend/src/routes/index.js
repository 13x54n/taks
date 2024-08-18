import { Router } from "express";
import jobsRouter from "./jobs.js"; // Import the jobs routes
import applicationsRouter from "./applications.js"; // Import the applications routes

const router = Router();

// Consolidate route logic in jobs and applications routers
router.use(jobsRouter);
router.use(applicationsRouter);

export default router;
