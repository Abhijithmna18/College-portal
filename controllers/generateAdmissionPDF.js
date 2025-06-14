const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
  Roboto: {
    normal: path.join(__dirname, '../utils/fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, '../utils/fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, '../utils/fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '../utils/fonts/Roboto-MediumItalic.ttf'),
  },
};

const printer = new PdfPrinter(fonts);

const generateAdmissionPDF = (res) => {
  const admissionModule = {
    title: "Admission Management",
    routes: [
      { feature: "Get All Inquiries", method: "GET", path: "/api/inquiries/all" },
      { feature: "Submit Admission Form", method: "POST", path: "/api/forms" },
      { feature: "Upload Documents", method: "POST", path: "/api/forms/upload" },
      { feature: "Submit Application", method: "POST", path: "/api/admissions/submit" },
      { feature: "Shortlist Applicants", method: "GET", path: "/api/admissions/shortlist" },
    ]
  };

  const docDefinition = {
    content: [
      { text: 'Admission Management – Routes', style: 'header', margin: [0, 0, 0, 20] },
      { text: admissionModule.title, style: 'subheader', margin: [0, 10, 0, 6] },
      {
        table: {
          widths: ['*', 'auto', '*'],
          body: [
            ['Feature', 'Method', 'Path'],
            ...admissionModule.routes.map(route => [route.feature, route.method, route.path])
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10]
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true },
    }
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="admission-routes.pdf"');
  pdfDoc.pipe(res);
  pdfDoc.end();
};

module.exports = generateAdmissionPDF;
