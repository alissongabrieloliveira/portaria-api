import service from "../services/frotaSaidaService.js";

export async function listarFrotaSaidas(req, res) {
  try {
    const saidas = await service.listar();
    res.json(saidas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarFrotaSaidaPorId(req, res) {
  try {
    const saida = await service.buscarPorId(req.params.id);
    if (!saida) return res.status(404).json({ error: "Saída não encontrada." });
    res.json(saida);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarFrotaSaida(req, res) {
  try {
    const nova = await service.criar(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarFrotaSaida(req, res) {
  try {
    const atualizada = await service.atualizar(req.params.id, req.body);
    res.json(atualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarFrotaSaida(req, res) {
  try {
    await service.deletar(req.params.id);
    res.json({ message: "Saída deletada com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
