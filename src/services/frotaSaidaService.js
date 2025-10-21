import pool from "../database/connection.js";

async function listar() {
  const result = await pool.query(
    "SELECT * FROM frota_saidas ORDER BY id DESC"
  );
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM frota_saidas WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function criar(data) {
  const {
    veiculo_id,
    km_saida,
    motivo,
    motorista_id,
    observacao,
    cidade_destino,
    estado_destino,
    usuario_saida_id,
  } = data;

  if (
    !veiculo_id ||
    !motorista_id ||
    !cidade_destino ||
    !estado_destino ||
    !usuario_saida_id
  ) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  const data_hora_saida = new Date();

  const result = await pool.query(
    `
    INSERT INTO frota_saidas (
      veiculo_id, km_saida, motivo, motorista_id,
      observacao, cidade_destino, estado_destino,
      data_hora_saida, usuario_saida_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *
  `,
    [
      veiculo_id,
      km_saida || null,
      motivo || null,
      motorista_id,
      observacao || null,
      cidade_destino,
      estado_destino,
      data_hora_saida,
      usuario_saida_id,
    ]
  );

  return result.rows[0];
}

async function atualizar(id, data) {
  const {
    veiculo_id,
    km_saida,
    motivo,
    motorista_id,
    observacao,
    cidade_destino,
    estado_destino,
    data_hora_saida,
    usuario_saida_id,
  } = data;

  const result = await pool.query(
    `
    UPDATE frota_saidas SET
      veiculo_id = $1,
      km_saida = $2,
      motivo = $3,
      motorista_id = $4,
      observacao = $5,
      cidade_destino = $6,
      estado_destino = $7,
      data_hora_saida = $8,
      usuario_saida_id = $9
    WHERE id = $10
    RETURNING *
  `,
    [
      veiculo_id,
      km_saida || null,
      motivo || null,
      motorista_id,
      observacao || null,
      cidade_destino,
      estado_destino,
      data_hora_saida || new Date(),
      usuario_saida_id,
      id,
    ]
  );

  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM frota_saidas WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
