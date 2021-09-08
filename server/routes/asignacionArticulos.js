const { Router } = require('express');
const router = Router();

const { asignacionArticulo, getAsignacionByCodigo, desasignarArticulo, historialAsignaciones, historialByArticulo,  }  = require('../controllers/asignacionControllers');


router.post('/asignacion', asignacionArticulo );
router.get('/asignacion/:codigo', getAsignacionByCodigo);
router.put('/asignacion', desasignarArticulo);
router.get('/asignacion-historial', historialAsignaciones);
router.get('/asignacion/historial/:codigo', historialByArticulo);





module.exports = router;