import pool from "../database/connection.js";

async function listar() {
  const result = await pool.query("SELECT * FROM setores ORDER BY id");
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM setores WHERE id = $1", [id]);
  return result.rows[0];
}

async function criar(nome) {
  if (!nome) throw new Error("O nome do setor é obrigatório.");
  const result = await pool.query(
    "INSERT INTO setores (nome) VALUES ($1) RETURNING *",
    [nome]
  );
  return result.rows[0];
}

async function atualizar(id, nome) {
  if (!nome) throw new Error("O nome do setor é obrigatório.");
  const result = await pool.query(
    "UPDATE setores SET nome = $1 WHERE id = $2 RETURNING *",
    [nome, id]
  );
  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM setores WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
