import pool from "../database/connection.js";

async function listar() {
  const result = await pool.query(
    "SELECT * FROM frota_entradas ORDER BY id DESC"
  );
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT * FROM frota_entradas WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function criar(data) {
  const {
    frota_saida_id,
    km_entrada,
    motorista_id,
    usuario_entrada_id,
    observacao,
  } = data;

  if (!frota_saida_id || !motorista_id || !usuario_entrada_id) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  const result = await pool.query(
    `
    INSERT INTO frota_entradas (
      frota_saida_id, km_entrada, motorista_id,
      usuario_entrada_id, observacao
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [
      frota_saida_id,
      km_entrada || null,
      motorista_id,
      usuario_entrada_id,
      observacao || null,
    ]
  );

  return result.rows[0];
}

async function atualizar(id, data) {
  const {
    frota_saida_id,
    km_entrada,
    motorista_id,
    usuario_entrada_id,
    observacao,
  } = data;

  const result = await pool.query(
    `
    UPDATE frota_entradas SET
      frota_saida_id = $1,
      km_entrada = $2,
      motorista_id = $3,
      usuario_entrada_id = $4,
      observacao = $5
    WHERE id = $6
    RETURNING *
  `,
    [
      frota_saida_id,
      km_entrada || null,
      motorista_id,
      usuario_entrada_id,
      observacao || null,
      id,
    ]
  );

  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM frota_entradas WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
