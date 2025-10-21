import express from "express";
import {
  listarFrotaEntradas,
  buscarFrotaEntradaPorId,
  criarFrotaEntrada,
  atualizarFrotaEntrada,
  deletarFrotaEntrada,
} from "../controllers/frotaEntradaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarFrotaEntradas);
router.get("/:id", buscarFrotaEntradaPorId);
router.post("/", criarFrotaEntrada);
router.put("/:id", atualizarFrotaEntrada);
router.delete("/:id", deletarFrotaEntrada);

export default router;
