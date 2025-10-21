import pool from "../database/connection.js";

async function listar() {
  const result = await pool.query("SELECT * FROM saidas ORDER BY id DESC");
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query("SELECT * FROM saidas WHERE id = $1", [id]);
  return result.rows[0];
}

async function criar({ entrada_id, km_saida, usuario_saida_id }) {
  if (!entrada_id || !usuario_saida_id) {
    throw new Error("entrada_id e usuario_saida_id são obrigatórios.");
  }

  const data_hora_saida = new Date();

  // Insere a saída
  const result = await pool.query(
    `
    INSERT INTO saidas (
      entrada_id, km_saida, data_hora_saida, usuario_saida_id
    ) VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [entrada_id, km_saida || null, data_hora_saida, usuario_saida_id]
  );

  // Atualiza o status da entrada para "saiu"
  await pool.query(
    `
    UPDATE entradas SET status = 'saiu' WHERE id = $1
  `,
    [entrada_id]
  );

  return result.rows[0];
}

async function atualizar(id, { km_saida, data_hora_saida, usuario_saida_id }) {
  const result = await pool.query(
    `
    UPDATE saidas SET
      km_saida = $1,
      data_hora_saida = $2,
      usuario_saida_id = $3
    WHERE id = $4
    RETURNING *
  `,
    [km_saida || null, data_hora_saida || new Date(), usuario_saida_id, id]
  );

  return result.rows[0];
}

async function deletar(id) {
  // Recupera entrada_id da saída antes de deletar
  const saida = await buscarPorId(id);
  if (!saida) throw new Error("Saída não encontrada.");

  // Deleta saída
  await pool.query("DELETE FROM saidas WHERE id = $1", [id]);

  // Opcional: reverter status da entrada para "no pátio"
  await pool.query(
    `
    UPDATE entradas SET status = 'no pátio' WHERE id = $1
  `,
    [saida.entrada_id]
  );
}

export default { listar, buscarPorId, criar, atualizar, deletar };
