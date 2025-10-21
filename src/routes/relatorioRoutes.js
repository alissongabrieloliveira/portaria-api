import express from "express";
import { exportarRelatorioMovimentacao } from "../controllers/relatorioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/movimentacao", exportarRelatorioMovimentacao);

export default router;
