import pool from "../database/connection.js";

export async function buscarMovimentacoes({ inicio, fim }) {
  const result = await pool.query(
    `
    SELECT 
      e.id,
      v.placa,
      v.modelo,
      ta.descricao AS tipo_acesso,
      TO_CHAR(e.data_hora_entrada, 'YYYY-MM-DD HH24:MI') AS data_entrada,
      TO_CHAR(s.data_hora_saida, 'YYYY-MM-DD HH24:MI') AS data_saida,
      e.status
    FROM entradas e
    JOIN veiculos v ON v.id = e.veiculo_id
    JOIN tipos_acesso ta ON ta.id = e.tipo_acesso_id
    LEFT JOIN saidas s ON s.entrada_id = e.id
    WHERE e.data_hora_entrada BETWEEN $1 AND $2
    ORDER BY e.data_hora_entrada DESC
  `,
    [`${inicio} 00:00:00`, `${fim} 23:59:59`]
  );

  return result.rows;
}
