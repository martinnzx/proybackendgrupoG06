const usuarioCtrl = require('./../../src/controllers/usuario.controller');

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const verificarToken = require('./../../src/middlewares/auth.middleware');

const validarCrearUsuario = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido'),
    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es requerido'),
    body('dni')
        .trim()
        .notEmpty().withMessage('El DNI es requerido')
        .isNumeric().withMessage('El DNI debe contener solo números')
        .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener entre 7 y 8 dígitos'),
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no tiene un formato válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const validarActualizarUsuario = [
    body('nombre')
        .optional().trim()
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido')
        .optional().trim()
        .notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email')
        .optional().trim()
        .isEmail().withMessage('El email no tiene un formato válido'),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

router.post('/', validarCrearUsuario, usuarioCtrl.createUsuario);
router.get('/', verificarToken, usuarioCtrl.getUsuarios);
router.get('/:dni', verificarToken, usuarioCtrl.getUsuarioByDni);
router.put('/:dni', verificarToken, validarActualizarUsuario, usuarioCtrl.updateUsuario);
router.delete('/:dni', verificarToken, usuarioCtrl.deleteUsuario);
router.patch('/:dni/inactive', verificarToken, usuarioCtrl.inactiveUsuario);
router.patch('/:dni/active', verificarToken, usuarioCtrl.activeUsuario);

module.exports = router;