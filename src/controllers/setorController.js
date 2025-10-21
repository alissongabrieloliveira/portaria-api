import setorService from "../services/setorService.js";

export async function listarSetores(req, res) {
  try {
    const setores = await setorService.listar();
    res.json(setores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarSetorPorId(req, res) {
  try {
    const setor = await setorService.buscarPorId(req.params.id);
    if (!setor) return res.status(404).json({ error: "Setor não encontrado." });
    res.json(setor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarSetor(req, res) {
  try {
    const setor = await setorService.criar(req.body.nome);
    res.status(201).json(setor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarSetor(req, res) {
  try {
    const setor = await setorService.atualizar(req.params.id, req.body.nome);
    res.json(setor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarSetor(req, res) {
  try {
    await setorService.deletar(req.params.id);
    res.json({ message: "Setor deletado com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
