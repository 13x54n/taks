// src/routes/users.js
import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.post("/save-role", async (req, res) => {
  const { walletAddress, role } = req.body;

  if (!walletAddress || !role) {
    return res
      .status(400)
      .json({ error: "Wallet address and role are required." });
  }

  try {
    const result = await pool.query(
      "SELECT role FROM roles WHERE wallet_address = $1",
      [walletAddress]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({
        message: `Address ${walletAddress} is already joined as ${result.rows[0].role}.`,
        alreadyJoined: true,
        role: result.rows[0].role,
      });
    } else {
      await pool.query(
        "INSERT INTO roles (wallet_address, role) VALUES ($1, $2)",
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

router.get("/get-role", async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required." });
  }

  try {
    const result = await pool.query(
      "SELECT role FROM roles WHERE wallet_address = $1",
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

export default router;
