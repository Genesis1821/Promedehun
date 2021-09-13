const { Router } = require('express');
const router = Router();

const { asignacionArticulo, desasignarArticulo, historialAsignaciones, historialByArticulo, getAsignacionesActivas,  }  = require('../controllers/asignacionControllers');


router.post('/asignacion', asignacionArticulo );
router.get('/asignacion', getAsignacionesActivas);
router.put('/asignacion', desasignarArticulo);
router.get('/asignacion-historial', historialAsignaciones);
router.get('/asignacion/historial/:codigo', historialByArticulo);





module.exports = router;