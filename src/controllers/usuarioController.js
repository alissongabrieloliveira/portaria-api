import usuarioService from "../services/usuarioService.js";

// Lista todos os usuários
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.listarTodos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca um usuário específico
export async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await usuarioService.buscarPorId(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado." });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualiza dados do usuário
export async function atualizarUsuario(req, res) {
  try {
    const atualizado = await usuarioService.atualizar(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Deleta um usuário
export async function desativarUsuario(req, res) {
  try {
    await usuarioService.desativar(req.params.id);
    res.json({ message: "Usuário desativado com sucesso." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
