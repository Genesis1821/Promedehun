const { Router } = require('express');
const router = Router();

const { registroArticulo, allArticulos, getArticulosByUser, getCodigoArticulos, articulosSinRelaciones, updateCodigoArticulo, updateArticulo, changeEstadoArticulo } = require('../controllers/articuloControllers');


// routes.
router.get('/articulo/allArticulos', allArticulos);
router.get('/articulo/articulos-usuario/:cedula', getArticulosByUser);
router.get('/articulo/codigoArticulos', getCodigoArticulos);
router.get('/articulo/sinRelacion', articulosSinRelaciones);
router.post('/articulo/registro', registroArticulo);
router.put('/articulo/updateCodigo', updateCodigoArticulo );
router.put('/articulo/updateArticulo', updateArticulo);
router.put('/articulo/changeEstado', changeEstadoArticulo);




module.exports = router;