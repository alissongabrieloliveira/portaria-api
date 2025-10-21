import express from "express";
import {
  listarTipos,
  buscarTipoPorId,
  criarTipo,
  atualizarTipo,
  deletarTipo,
} from "../controllers/tipoAcessoController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarTipos);
router.get("/:id", buscarTipoPorId);
router.post("/", criarTipo);
router.put("/:id", atualizarTipo);
router.delete("/:id", deletarTipo);

export default router;
