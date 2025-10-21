import veiculoService from "../services/veiculoService.js";

export async function listarVeiculos(req, res) {
  try {
    const veiculos = await veiculoService.listar();
    res.json(veiculos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarVeiculoPorId(req, res) {
  try {
    const veiculo = await veiculoService.buscarPorId(req.params.id);
    if (!veiculo)
      return res.status(404).json({ error: "Veículo não encontrado." });
    res.json(veiculo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarVeiculo(req, res) {
  try {
    const veiculo = await veiculoService.criar(req.body);
    res.status(201).json(veiculo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarVeiculo(req, res) {
  try {
    const veiculo = await veiculoService.atualizar(req.params.id, req.body);
    res.json(veiculo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarVeiculo(req, res) {
  try {
    await veiculoService.deletar(req.params.id);
    res.json({ message: "Veículo deletado com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
