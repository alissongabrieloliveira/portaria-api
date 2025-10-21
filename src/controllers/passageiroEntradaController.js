import service from "../services/passageiroEntradaService.js";

export async function listarPassageiros(req, res) {
  try {
    const passageiros = await service.listar(req.params.entrada_id);
    res.json(passageiros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function adicionarPassageiro(req, res) {
  try {
    const { entrada_id, pessoa_id } = req.body;
    const passageiro = await service.adicionar({ entrada_id, pessoa_id });
    res.status(201).json(passageiro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removerPassageiro(req, res) {
  try {
    await service.remover(req.params.entrada_id, req.params.pessoa_id);
    res.json({ message: "Passageiro removido com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
