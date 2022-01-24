const { Router } = require('express');
const router = Router();

const {
    modelFinalPagePdf,
    generarPdf
} = require('../controllers/pdfControllers');


router.get('/estructura', modelFinalPagePdf);
router.post('/generar/informe', generarPdf);

module.exports = router;

