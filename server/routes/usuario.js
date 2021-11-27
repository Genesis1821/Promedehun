const { Router } = require('express');
const router = Router();

const { registarUsuario, usersNoAsignados, updateUserNoAsignado, getUsuarioRetirados, retirarUsuario, getAllUser, validarLogin } = require('../controllers/usuarioControllers');

//routes.
router.get('/usuario/noRelacionado', usersNoAsignados);
router.get('/usuario/allUsers', getAllUser);
router.get('/usuario/allUsersRetirados', getUsuarioRetirados);
router.post('/usuario/registro', registarUsuario);
router.post('/usuario/login', validarLogin);
router.put('/usuario/updateUsuario', updateUserNoAsignado);
router.put('/usuario/retirar', retirarUsuario);




module.exports = router;