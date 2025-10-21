import express from "express";
import {
  listarPostos,
  buscarPostoPorId,
  criarPosto,
  atualizarPosto,
  deletarPosto,
} from "../controllers/postoControleController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarPostos);
router.get("/:id", buscarPostoPorId);
router.post("/", criarPosto);
router.put("/:id", atualizarPosto);
router.delete("/:id", deletarPosto);

export default router;
