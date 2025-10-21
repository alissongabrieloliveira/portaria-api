import express from "express";
import {
  listarEntradas,
  buscarEntradaPorId,
  criarEntrada,
  atualizarEntrada,
  deletarEntrada,
} from "../controllers/entradaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarEntradas);
router.get("/:id", buscarEntradaPorId);
router.post("/", criarEntrada);
router.put("/:id", atualizarEntrada);
router.delete("/:id", deletarEntrada);

export default router;
