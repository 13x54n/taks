import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Save or update the role for a user
router.post("/save-role", async (req, res) => {
  const { walletAddress, role } = req.body;

  if (!walletAddress || !role) {
    return res
      .status(400)
      .json({ error: "Wallet address and role are required." });
  }

  try {
    // Ensure the user exists in the Users table
    const userCheckResult = await pool.query(
      "SELECT user_id FROM Users WHERE user_id = $1",
      [walletAddress]
    );

    if (userCheckResult.rows.length === 0) {
      // If user does not exist, insert the user
      await pool.query(
        "INSERT INTO Users (user_id, reputation, employer_reputation) VALUES ($1, $2, $3)",
        [walletAddress, 0, 0]
      );
    }

    // Check if the role is already assigned
    const roleCheckResult = await pool.query(
      "SELECT role FROM Roles WHERE wallet_address = $1",
      [walletAddress]
    );

    if (roleCheckResult.rows.length > 0) {
      return res.status(200).json({
        message: `Address ${walletAddress} is already joined as ${roleCheckResult.rows[0].role}.`,
        alreadyJoined: true,
        role: roleCheckResult.rows[0].role,
      });
    } else {
      // Save the new role for the user
      await pool.query(
        "INSERT INTO Roles (wallet_address, role) VALUES ($1, $2)",
        [walletAddress, role]
      );
      return res.status(200).json({
        message: "Role saved successfully.",
        alreadyJoined: false,
        walletAddress,
        role,
      });
    }
  } catch (error) {
    console.error("Error saving role to database:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get the role for a user by wallet address
router.get("/get-role", async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required." });
  }

  try {
    const result = await pool.query(
      "SELECT role FROM Roles WHERE wallet_address = $1",
      [walletAddress]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({ role: result.rows[0].role });
    } else {
      return res.status(404).json({ error: "Role not found." });
    }
  } catch (error) {
    console.error("Error fetching role from database:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user information by wallet address
router.get("/get-user-info", async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required." });
  }

  try {
    const result = await pool.query("SELECT * FROM Users WHERE user_id = $1", [
      walletAddress,
    ]);

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching user info from database:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create or update user information
router.post("/save-user-info", async (req, res) => {
  const { walletAddress, reputation, employerReputation } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Users (user_id, reputation, employer_reputation) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET reputation = EXCLUDED.reputation, employer_reputation = EXCLUDED.employer_reputation RETURNING *",
      [walletAddress, reputation || 0, employerReputation || 0]
    );

    res.status(200).json({
      message: "User information saved successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving user info to database:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
