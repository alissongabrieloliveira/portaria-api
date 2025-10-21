import pool from "../database/connection.js";

// Lista todos os usuários
async function listarTodos() {
  const result = await pool.query(
    "SELECT id, nome_completo, nome_usuario, cpf, telefone, tipo_usuario, data_cadastro, ultimo_acesso, ativo FROM usuarios"
  );
  return result.rows;
}

// Busca um usuário específico
async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT id, nome_completo, nome_usuario, cpf, telefone, tipo_usuario, data_cadastro, ultimo_acesso, ativo FROM usuarios WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Atualiza dados do usuário
async function atualizar(id, data) {
  const { nome_completo, telefone, tipo_usuario, ativo } = data;

  const result = await pool.query(
    `
    UPDATE usuarios
    SET nome_completo = $1, telefone = $2, tipo_usuario = $3, ativo = $4
    WHERE id = $5
    RETURNING id, nome_completo, nome_usuario, cpf, telefone, tipo_usuario, ativo;
  `,
    [nome_completo, telefone, tipo_usuario, ativo, id]
  );

  return result.rows[0];
}

// Deleta um usuário
async function desativar(id) {
  await pool.query(
    `
    UPDATE usuarios SET ativo = false WHERE id = $1
  `,
    [id]
  );
}

export default { listarTodos, buscarPorId, atualizar, desativar };
