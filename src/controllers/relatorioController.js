import { buscarMovimentacoes } from "../services/relatorioService.js";
import { gerarRelatorioPDF } from "../utils/gerarRelatorioPDF.js";
import { gerarRelatorioExcel } from "../utils/gerarRelatorioExcel.js";

export async function exportarRelatorioMovimentacao(req, res) {
  try {
    const { formato, inicio, fim } = req.query;

    if (!formato || !inicio || !fim) {
      return res.status(400).json({
        error: "Parâmetros 'formato', 'inicio' e 'fim' são obrigatórios.",
      });
    }

    const dados = await buscarMovimentacoes({ inicio, fim });

    if (formato === "pdf") {
      return gerarRelatorioPDF(dados, { inicio, fim }, res);
    } else if (formato === "excel") {
      return await gerarRelatorioExcel(dados, { inicio, fim }, res);
    } else {
      return res
        .status(400)
        .json({ error: "Formato não suportado. Use 'pdf' ou 'excel'." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar relatório." });
  }
}
