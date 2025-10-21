import pool from "../database/connection.js";

async function listar(entrada_id) {
  const result = await pool.query(
    `
    SELECT pe.pessoa_id, p.nome_completo, p.cpf, p.telefone
    FROM passageiros_entrada pe
    JOIN pessoas p ON p.id = pe.pessoa_id
    WHERE pe.entrada_id = $1
  `,
    [entrada_id]
  );

  return result.rows;
}

async function adicionar({ entrada_id, pessoa_id }) {
  if (!entrada_id || !pessoa_id) {
    throw new Error("entrada_id e pessoa_id são obrigatórios.");
  }

  const exists = await pool.query(
    `
    SELECT * FROM passageiros_entrada 
    WHERE entrada_id = $1 AND pessoa_id = $2
  `,
    [entrada_id, pessoa_id]
  );

  if (exists.rows.length > 0) {
    throw new Error("Passageiro já vinculado a esta entrada.");
  }

  const result = await pool.query(
    `
    INSERT INTO passageiros_entrada (entrada_id, pessoa_id)
    VALUES ($1, $2) RETURNING *
  `,
    [entrada_id, pessoa_id]
  );

  return result.rows[0];
}

async function remover(entrada_id, pessoa_id) {
  await pool.query(
    `
    DELETE FROM passageiros_entrada
    WHERE entrada_id = $1 AND pessoa_id = $2
  `,
    [entrada_id, pessoa_id]
  );
}

export default { listar, adicionar, remover };
