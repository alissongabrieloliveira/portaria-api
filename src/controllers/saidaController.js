import saidaService from "../services/saidaService.js";

export async function listarSaidas(req, res) {
  try {
    const saidas = await saidaService.listar();
    res.json(saidas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarSaidaPorId(req, res) {
  try {
    const saida = await saidaService.buscarPorId(req.params.id);
    if (!saida) return res.status(404).json({ error: "Saída não encontrada." });
    res.json(saida);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarSaida(req, res) {
  try {
    const novaSaida = await saidaService.criar(req.body);
    res.status(201).json(novaSaida);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarSaida(req, res) {
  try {
    const saida = await saidaService.atualizar(req.params.id, req.body);
    res.json(saida);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarSaida(req, res) {
  try {
    await saidaService.deletar(req.params.id);
    res.json({ message: "Saída deletada com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
