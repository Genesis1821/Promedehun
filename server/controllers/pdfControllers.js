const fs = require('fs').promises
const { generarPdfWithPuppeter } = require('../helpers/generarPDF');

let dataToBuildPDF = {};

const modelFinalPagePdf = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('index', dataToBuildPDF);
}
const generarPdf = async (req, res) => {
    try {
        const dataInforme = req.body;

        dataToBuildPDF = { allData: dataInforme };
        await generarPdfWithPuppeter();
        dataToBuildPDF = {};

        res.sendFile(path.join(__dirname, `../pdf/inventario.pdf`));
        setTimeout(() => {
            fs.unlink(path.join(path.join(__dirname, `../pdf/inventario.pdf`)))
        }, 2700);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    modelFinalPagePdf,
    generarPdf
}