import service from "../services/frotaEntradaService.js";

export async function listarFrotaEntradas(req, res) {
  try {
    const entradas = await service.listar();
    res.json(entradas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarFrotaEntradaPorId(req, res) {
  try {
    const entrada = await service.buscarPorId(req.params.id);
    if (!entrada)
      return res.status(404).json({ error: "Entrada não encontrada." });
    res.json(entrada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarFrotaEntrada(req, res) {
  try {
    const nova = await service.criar(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarFrotaEntrada(req, res) {
  try {
    const atualizada = await service.atualizar(req.params.id, req.body);
    res.json(atualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarFrotaEntrada(req, res) {
  try {
    await service.deletar(req.params.id);
    res.json({ message: "Entrada deletada com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
