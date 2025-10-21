import express from "express";
import {
  listarPassageiros,
  adicionarPassageiro,
  removerPassageiro,
} from "../controllers/passageiroEntradaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/:entrada_id", listarPassageiros);
router.post("/", adicionarPassageiro);
router.delete("/:entrada_id/:pessoa_id", removerPassageiro);

export default router;
