import tipoAcessoService from "../services/tipoAcessoService.js";

// Listar todos os tipos de acesso
export async function listarTipos(req, res) {
  try {
    const tipos = await tipoAcessoService.listar();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar tipo de acesso específico
export async function buscarTipoPorId(req, res) {
  try {
    const tipo = await tipoAcessoService.buscarPorId(req.params.id);
    if (!tipo)
      return res.status(404).json({ error: "Tipo de acesso não encontrado." });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cria tipo de acesso
export async function criarTipo(req, res) {
  try {
    const tipo = await tipoAcessoService.criar(req.body.descricao);
    res.status(201).json(tipo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Atualiza um tipo de acesso
export async function atualizarTipo(req, res) {
  try {
    const tipo = await tipoAcessoService.atualizar(
      req.params.id,
      req.body.descricao
    );
    res.json(tipo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Deleta um tipo de acesso
export async function deletarTipo(req, res) {
  try {
    await tipoAcessoService.deletar(req.params.id);
    res.json({ message: "Tipo de acesso deletado com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
