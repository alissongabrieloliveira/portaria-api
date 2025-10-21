import express from "express";
import pool from "../database/connection.js";

const router = express.Router();

// Endpoint de teste
router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Conexão bem-sucedida!",
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    res.status(500).json({ error: "Erro de conexão com o banco de dados." });
  }
});

export default router;
