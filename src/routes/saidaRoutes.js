import express from "express";
import {
  listarSaidas,
  buscarSaidaPorId,
  criarSaida,
  atualizarSaida,
  deletarSaida,
} from "../controllers/saidaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarSaidas);
router.get("/:id", buscarSaidaPorId);
router.post("/", criarSaida);
router.put("/:id", atualizarSaida);
router.delete("/:id", deletarSaida);

export default router;
