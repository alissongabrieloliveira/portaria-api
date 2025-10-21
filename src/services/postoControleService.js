import pool from "../database/connection.js";

async function listar() {
  const result = await pool.query("SELECT * FROM postos_controle ORDER BY id");
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT * FROM postos_controle WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function criar(nome, local) {
  if (!nome || !local) throw new Error("Nome e local são obrigatórios.");
  const result = await pool.query(
    "INSERT INTO postos_controle (nome, local) VALUES ($1, $2) RETURNING *",
    [nome, local]
  );
  return result.rows[0];
}

async function atualizar(id, nome, local) {
  if (!nome || !local) throw new Error("Nome e local são obrigatórios.");
  const result = await pool.query(
    "UPDATE postos_controle SET nome = $1, local = $2 WHERE id = $3 RETURNING *",
    [nome, local, id]
  );
  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM postos_controle WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
