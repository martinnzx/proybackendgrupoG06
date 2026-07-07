const express = require('express');
const router = express.Router();
const dashboardCtrl = require('../controllers/dashboard.controller');
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.get('/stats', verificarToken, verificarRol('admin'), dashboardCtrl.getStats);

module.exports = router;