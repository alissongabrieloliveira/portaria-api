import pool from "../database/connection.js";

const STATUS_VALIDOS = ["no pátio", "saiu"];

function validarStatus(status) {
  if (!STATUS_VALIDOS.includes(status)) {
    throw new Error("Status inválido.");
  }
}

async function listar() {
  const result = await pool.query("SELECT * FROM entradas ORDER BY id DESC");
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM entradas WHERE id = $1", [id]);
  return result.rows[0];
}

async function criar(data) {
  const {
    veiculo_id,
    tipo_acesso_id,
    km_entrada,
    setor_id,
    responsavel_visita,
    empresa,
    usuario_entrada_id,
    observacao,
    status,
  } = data;

  if (
    !veiculo_id ||
    !tipo_acesso_id ||
    !setor_id ||
    !usuario_entrada_id ||
    !status
  ) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  validarStatus(status);

  const data_hora_entrada = new Date();

  const result = await pool.query(
    `
    INSERT INTO entradas (
      veiculo_id, tipo_acesso_id, km_entrada, setor_id,
      responsavel_visita, empresa, data_hora_entrada,
      usuario_entrada_id, observacao, status
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *
  `,
    [
      veiculo_id,
      tipo_acesso_id,
      km_entrada || null,
      setor_id,
      responsavel_visita || null,
      empresa || null,
      data_hora_entrada,
      usuario_entrada_id,
      observacao || null,
      status,
    ]
  );

  return result.rows[0];
}

async function atualizar(id, data) {
  const {
    veiculo_id,
    tipo_acesso_id,
    km_entrada,
    setor_id,
    responsavel_visita,
    empresa,
    data_hora_entrada,
    usuario_entrada_id,
    observacao,
    status,
  } = data;

  validarStatus(status);

  const result = await pool.query(
    `
    UPDATE entradas SET
      veiculo_id = $1,
      tipo_acesso_id = $2,
      km_entrada = $3,
      setor_id = $4,
      responsavel_visita = $5,
      empresa = $6,
      data_hora_entrada = $7,
      usuario_entrada_id = $8,
      observacao = $9,
      status = $10
    WHERE id = $11
    RETURNING *
  `,
    [
      veiculo_id,
      tipo_acesso_id,
      km_entrada || null,
      setor_id,
      responsavel_visita || null,
      empresa || null,
      data_hora_entrada || new Date(),
      usuario_entrada_id,
      observacao || null,
      status,
      id,
    ]
  );

  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM entradas WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
