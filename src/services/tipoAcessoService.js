import pool from "../database/connection.js";

const DESCRICOES_VALIDAS = [
  "colaborador",
  "prestador de serviço",
  "visitante",
  "frota própria",
];

// Valida a descrição
function validarDescricao(descricao) {
  if (!DESCRICOES_VALIDAS.includes(descricao)) {
    throw new Error("Descrição inválida.");
  }
}

// Lista o tipo de acesso
async function listar() {
  const result = await pool.query("SELECT * FROM tipos_acesso ORDER BY id");
  return result.rows;
}

// Busca um tipo de acesso específico
async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM tipos_acesso WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

// Cria um novo tipo de acesso
async function criar(descricao) {
  validarDescricao(descricao);
  const result = await pool.query(
    "INSERT INTO tipos_acesso (descricao) VALUES ($1) RETURNING *",
    [descricao]
  );
  return result.rows[0];
}

// Atualiza um tipo de acesso
async function atualizar(id, descricao) {
  validarDescricao(descricao);
  const result = await pool.query(
    "UPDATE tipos_acesso SET descricao = $1 WHERE id = $2 RETURNING *",
    [descricao, id]
  );
  return result.rows[0];
}

// Deleta um tipo de acesso
async function deletar(id) {
  await pool.query("DELETE FROM tipos_acesso WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
