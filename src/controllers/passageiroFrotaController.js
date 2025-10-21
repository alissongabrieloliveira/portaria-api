import service from "../services/passageiroFrotaService.js";

export async function listarPassageiros(req, res) {
  try {
    const passageiros = await service.listar(req.params.frota_saida_id);
    res.json(passageiros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function adicionarPassageiro(req, res) {
  try {
    const { frota_saida_id, pessoa_id } = req.body;
    const result = await service.adicionar({ frota_saida_id, pessoa_id });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removerPassageiro(req, res) {
  try {
    await service.remover(req.params.frota_saida_id, req.params.pessoa_id);
    res.json({ message: "Passageiro removido com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
