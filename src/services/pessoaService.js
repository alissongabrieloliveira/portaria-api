import pool from "../database/connection.js";

async function listar() {
  const result = await pool.query("SELECT * FROM pessoas ORDER BY id");
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM pessoas WHERE id = $1", [id]);
  return result.rows[0];
}

async function criar({ nome_completo, cpf, telefone }) {
  if (!nome_completo || !cpf)
    throw new Error("Nome completo e CPF são obrigatórios.");

  // Verifica se CPF já existe
  const exists = await pool.query("SELECT id FROM pessoas WHERE cpf = $1", [
    cpf,
  ]);
  if (exists.rows.length > 0) throw new Error("CPF já cadastrado.");

  const data_cadastro = new Date();

  const result = await pool.query(
    "INSERT INTO pessoas (nome_completo, cpf, telefone, data_cadastro) VALUES ($1, $2, $3, $4) RETURNING *",
    [nome_completo, cpf, telefone, data_cadastro]
  );

  return result.rows[0];
}

async function atualizar(id, { nome_completo, telefone }) {
  const result = await pool.query(
    "UPDATE pessoas SET nome_completo = $1, telefone = $2 WHERE id = $3 RETURNING *",
    [nome_completo, telefone, id]
  );
  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM pessoas WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
