import express from "express";
import {
  listarPassageiros,
  adicionarPassageiro,
  removerPassageiro,
} from "../controllers/passageiroFrotaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/:frota_saida_id", listarPassageiros);
router.post("/", adicionarPassageiro);
router.delete("/:frota_saida_id/:pessoa_id", removerPassageiro);

export default router;
