const express = require('express');
const router = express.Router();
const aiCtrl = require('../controllers/ai.controller');
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.post('/generar-rutina', verificarToken, verificarRol('entrenador'), aiCtrl.generarRutinaIA);

module.exports = router;
