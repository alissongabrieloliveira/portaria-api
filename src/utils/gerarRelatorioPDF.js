import PDFDocument from "pdfkit";

export function gerarRelatorioPDF(dados, { inicio, fim }, res) {
  const doc = new PDFDocument({ margin: 50, size: "A4" });

  // Stream PDF para resposta
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=relatorio-entradas-${inicio}_a_${fim}.pdf`
  );
  doc.pipe(res);

  // Cabeçalho
  doc.fontSize(18).text("Relatório de Movimentações", { align: "center" });
  doc
    .moveDown()
    .fontSize(12)
    .text(`Período: ${inicio} a ${fim}`, { align: "center" });
  doc.moveDown();

  // Cabeçalho da Tabela
  doc.font("Helvetica-Bold");
  doc.text("Placa", 50, doc.y);
  doc.text("Tipo Acesso", 120, doc.y);
  doc.text("Modelo", 220, doc.y);
  doc.text("Entrada", 320, doc.y);
  doc.text("Saída", 420, doc.y);
  doc.text("Status", 500, doc.y);
  doc.moveDown();

  // Conteúdo
  doc.font("Helvetica");

  dados.forEach((item) => {
    doc.text(item.placa, 50, doc.y);
    doc.text(item.tipo_acesso, 120, doc.y);
    doc.text(item.modelo, 220, doc.y);
    doc.text(item.data_entrada || "-", 320, doc.y);
    doc.text(item.data_saida || "-", 420, doc.y);
    doc.text(item.status, 500, doc.y);
    doc.moveDown();
  });

  doc.end();
}
