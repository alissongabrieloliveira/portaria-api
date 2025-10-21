import express from "express";
import {
  listarSetores,
  buscarSetorPorId,
  criarSetor,
  atualizarSetor,
  deletarSetor,
} from "../controllers/setorController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarSetores);
router.get("/:id", buscarSetorPorId);
router.post("/", criarSetor);
router.put("/:id", atualizarSetor);
router.delete("/:id", deletarSetor);

export default router;
