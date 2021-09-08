const { Router } = require('express');
const router = Router();

const { registarUsuario, usersNoAsignados, updateUserNoAsignado, usuarioRetirado, getUsuarioRetirados } = require('../controllers/usuarioControllers');

//routes.
router.get('/usuario/noRelacionado', usersNoAsignados);
router.get('/usuario/allUsersRetirados', getUsuarioRetirados);
router.post('/usuario/registro', registarUsuario);
router.put('/usuario/updateUsuario', updateUserNoAsignado);
router.put('/usuario/retirado', usuarioRetirado);




module.exports = router;