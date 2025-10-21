import entradaService from "../services/entradaService.js";

export async function listarEntradas(req, res) {
  try {
    const entradas = await entradaService.listar();
    res.json(entradas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarEntradaPorId(req, res) {
  try {
    const entrada = await entradaService.buscarPorId(req.params.id);
    if (!entrada)
      return res.status(404).json({ error: "Entrada não encontrada." });
    res.json(entrada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarEntrada(req, res) {
  try {
    const novaEntrada = await entradaService.criar(req.body);
    res.status(201).json(novaEntrada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarEntrada(req, res) {
  try {
    const entrada = await entradaService.atualizar(req.params.id, req.body);
    res.json(entrada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarEntrada(req, res) {
  try {
    await entradaService.deletar(req.params.id);
    res.json({ message: "Entrada deletada com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
