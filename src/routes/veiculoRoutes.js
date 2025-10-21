import express from "express";
import {
  listarVeiculos,
  buscarVeiculoPorId,
  criarVeiculo,
  atualizarVeiculo,
  deletarVeiculo,
} from "../controllers/veiculoController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarVeiculos);
router.get("/:id", buscarVeiculoPorId);
router.post("/", criarVeiculo);
router.put("/:id", atualizarVeiculo);
router.delete("/:id", deletarVeiculo);

export default router;
