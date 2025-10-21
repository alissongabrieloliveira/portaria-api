import ExcelJS from "exceljs";

export async function gerarRelatorioExcel(dados, { inicio, fim }, res) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Relatório de Movimentações");

  // Cabeçalho
  sheet.mergeCells("A1", "F1");
  sheet.getCell(
    "A1"
  ).value = `Relatório de Movimentações - Período: ${inicio} a ${fim}`;
  sheet.getCell("A1").font = { size: 14, bold: true };
  sheet.getRow(2).values = [
    "Placa",
    "Tipo de Acesso",
    "Modelo",
    "Entrada",
    "Saída",
    "Status",
  ];
  sheet.getRow(2).font = { bold: true };

  // Dados
  dados.forEach((item, index) => {
    sheet.addRow([
      item.placa,
      item.tipo_acesso,
      item.modelo,
      item.data_entrada || "-",
      item.data_saida || "-",
      item.status,
    ]);
  });

  // Ajustar largura das colunas
  sheet.columns.forEach((column) => {
    column.width = 20;
  });

  // Preparar resposta
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=relatorio-entradas-${inicio}_a_${fim}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
}
