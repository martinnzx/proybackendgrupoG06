const express = require('express');
const router = express.Router();
const rolCtrl = require('./../../src/controllers/rol.controller');
const { body } = require('express-validator');
const verificarToken = require('./../../src/middlewares/auth.middleware');
const verificarRol = require('./../../src/middlewares/rol.middleware');

const validarCrearRol = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre del rol es requerido')
        .isIn(['admin', 'entrenador', 'socio']).withMessage('El rol debe ser: admin, entrenador o socio'),
];

router.get('/', verificarToken, verificarRol('admin'), rolCtrl.getRoles);
router.post('/', verificarToken, verificarRol('admin'), validarCrearRol, rolCtrl.createRol);
router.get('/usuario/:dni', verificarToken, verificarRol('admin'), rolCtrl.getRolesByUsuario);
router.post('/usuario/:dni/rol/:nombre', verificarToken, verificarRol('admin'), rolCtrl.assignRolToUsuario);
router.delete('/usuario/:dni/rol/:nombre', verificarToken, verificarRol('admin'), rolCtrl.removeRolFromUsuario);

module.exports = router;