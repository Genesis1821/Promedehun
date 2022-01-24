const puppeteer = require('puppeteer');
const puppeterReport = require('puppeteer-report');

const generarPdfWithPuppeter = async () => {
    try {
        const options = {
            format: 'letter',
            path: `pdf/inventario.pdf`,
            margin: { bottom: '12px', top: '6px' }
        };

        const naveg = await puppeteer.launch();
        const page = await naveg.newPage();
        await page.goto('http://localhost:4000/api/estructura');

        await puppeterReport.pdfPage(page, options);
        await naveg.close(); // A este punto el pdf ya ha sido generado. 
    } catch (err) {
        console.log('Error generarPdfWithPuppeter: ', err);
    }
}

module.exports = {
    generarPdfWithPuppeter
}