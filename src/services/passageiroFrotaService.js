import pool from "../database/connection.js";

async function listar(frota_saida_id) {
  const result = await pool.query(
    `
    SELECT pf.pessoa_id, p.nome_completo, p.cpf, p.telefone
    FROM passageiros_frota pf
    JOIN pessoas p ON p.id = pf.pessoa_id
    WHERE pf.frota_saida_id = $1
  `,
    [frota_saida_id]
  );

  return result.rows;
}

async function adicionar({ frota_saida_id, pessoa_id }) {
  if (!frota_saida_id || !pessoa_id) {
    throw new Error("frota_saida_id e pessoa_id são obrigatórios.");
  }

  const existe = await pool.query(
    `
    SELECT 1 FROM passageiros_frota
    WHERE frota_saida_id = $1 AND pessoa_id = $2
  `,
    [frota_saida_id, pessoa_id]
  );

  if (existe.rows.length > 0) {
    throw new Error("Passageiro já vinculado a essa saída.");
  }

  const result = await pool.query(
    `
    INSERT INTO passageiros_frota (frota_saida_id, pessoa_id)
    VALUES ($1, $2) RETURNING *
  `,
    [frota_saida_id, pessoa_id]
  );

  return result.rows[0];
}

async function remover(frota_saida_id, pessoa_id) {
  await pool.query(
    `
    DELETE FROM passageiros_frota
    WHERE frota_saida_id = $1 AND pessoa_id = $2
  `,
    [frota_saida_id, pessoa_id]
  );
}

export default { listar, adicionar, remover };
