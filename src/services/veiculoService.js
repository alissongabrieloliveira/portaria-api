import pool from "../database/connection.js";

const TIPOS_VALIDOS = [
  "frota própria",
  "veículo de visitantes",
  "veículo de colaborador",
  "veículo de prestador de serviço",
];

function validarTipo(tipo) {
  if (!TIPOS_VALIDOS.includes(tipo)) {
    throw new Error("Tipo de veículo inválido.");
  }
}

async function listar() {
  const result = await pool.query("SELECT * FROM veiculos ORDER BY id");
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM veiculos WHERE id = $1", [id]);
  return result.rows[0];
}

async function criar(data) {
  const {
    placa,
    marca,
    modelo,
    cor,
    tipo_veiculo,
    tipo_acesso_id,
    observacao,
    status,
  } = data;

  if (!placa || !marca || !modelo || !cor || !tipo_veiculo || !tipo_acesso_id) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  validarTipo(tipo_veiculo);

  const existe = await pool.query("SELECT id FROM veiculos WHERE placa = $1", [
    placa,
  ]);
  if (existe.rows.length > 0)
    throw new Error("Veículo com esta placa já existe.");

  const result = await pool.query(
    `
    INSERT INTO veiculos 
    (placa, marca, modelo, cor, tipo_veiculo, tipo_acesso_id, observacao, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *`,
    [
      placa,
      marca,
      modelo,
      cor,
      tipo_veiculo,
      tipo_acesso_id,
      observacao || null,
      status ?? true,
    ]
  );

  return result.rows[0];
}

async function atualizar(id, data) {
  const {
    placa,
    marca,
    modelo,
    cor,
    tipo_veiculo,
    tipo_acesso_id,
    observacao,
    status,
  } = data;

  validarTipo(tipo_veiculo);

  const result = await pool.query(
    `
    UPDATE veiculos SET
      placa = $1,
      marca = $2,
      modelo = $3,
      cor = $4,
      tipo_veiculo = $5,
      tipo_acesso_id = $6,
      observacao = $7,
      status = $8
    WHERE id = $9
    RETURNING *`,
    [
      placa,
      marca,
      modelo,
      cor,
      tipo_veiculo,
      tipo_acesso_id,
      observacao || null,
      status ?? true,
      id,
    ]
  );

  return result.rows[0];
}

async function deletar(id) {
  await pool.query("DELETE FROM veiculos WHERE id = $1", [id]);
}

export default { listar, buscarPorId, criar, atualizar, deletar };
