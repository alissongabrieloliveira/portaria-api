import pessoaService from "../services/pessoaService.js";

export async function listarPessoas(req, res) {
  try {
    const pessoas = await pessoaService.listar();
    res.json(pessoas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarPessoaPorId(req, res) {
  try {
    const pessoa = await pessoaService.buscarPorId(req.params.id);
    if (!pessoa)
      return res.status(404).json({ error: "Pessoa não encontrada." });
    res.json(pessoa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function criarPessoa(req, res) {
  try {
    const { nome_completo, cpf, telefone } = req.body;
    const pessoa = await pessoaService.criar({ nome_completo, cpf, telefone });
    res.status(201).json(pessoa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function atualizarPessoa(req, res) {
  try {
    const { nome_completo, telefone } = req.body;
    const pessoa = await pessoaService.atualizar(req.params.id, {
      nome_completo,
      telefone,
    });
    res.json(pessoa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletarPessoa(req, res) {
  try {
    await pessoaService.deletar(req.params.id);
    res.json({ message: "Pessoa deletada com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
