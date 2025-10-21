import postoControleService from "../services/postoControleService.js";

export async function listarPostos(req, res) {
  try {
    const postos = await postoControleService.listar();
    res.json(postos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarPostoPorId(req, res) {
  try {
    const posto = await postoControleService.buscarPorId(req.params.id);
    if (!posto)
      return res
        .status(404)
        .json({ error: "Posto de controle não encontrado." });
    res.json(posto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarPosto(req, res) {
  try {
    const { nome, local } = req.body;
    const posto = await postoControleService.criar(nome, local);
    res.status(201).json(posto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarPosto(req, res) {
  try {
    const { nome, local } = req.body;
    const posto = await postoControleService.atualizar(
      req.params.id,
      nome,
      local
    );
    res.json(posto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarPosto(req, res) {
  try {
    await postoControleService.deletar(req.params.id);
    res.json({ message: "Posto de controle deletado com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
