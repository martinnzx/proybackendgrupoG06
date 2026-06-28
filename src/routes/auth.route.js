const authCtrl = require('./../../src/controllers/auth.controller');

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const validarLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no tiene un formato válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es requerida'),
];

router.post('/login', validarLogin, authCtrl.login);

module.exports = router;