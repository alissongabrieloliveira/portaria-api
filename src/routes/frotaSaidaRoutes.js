import express from "express";
import {
  listarFrotaSaidas,
  buscarFrotaSaidaPorId,
  criarFrotaSaida,
  atualizarFrotaSaida,
  deletarFrotaSaida,
} from "../controllers/frotaSaidaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarFrotaSaidas);
router.get("/:id", buscarFrotaSaidaPorId);
router.post("/", criarFrotaSaida);
router.put("/:id", atualizarFrotaSaida);
router.delete("/:id", deletarFrotaSaida);

export default router;
