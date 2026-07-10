const express = require('express');
const router = express.Router();
const nutricionCtrl = require('../controllers/nutricion.controller');
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.get('/buscar', verificarToken, verificarRol('socio'), nutricionCtrl.buscarAlimento);

module.exports = router;
