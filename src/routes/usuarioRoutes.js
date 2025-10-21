import express from "express";
import {
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  desativarUsuario,
} from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verificarToken); // todas as rotas protegidas

router.get("/", listarUsuarios);
router.get("/:id", buscarUsuarioPorId);
router.put("/:id", atualizarUsuario);
router.delete("/:id", desativarUsuario);

export default router;
