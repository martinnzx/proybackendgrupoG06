
const tarifaCtrl = require('../controllers/tarifa.controller');

const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.get('/', verificarToken, verificarRol('admin'), tarifaCtrl.getTarifas); 
router.get('/mis-tarifas', verificarToken, verificarRol('socio'), tarifaCtrl.getMisTarifas); 
router.get('/impagas/:usuarioId', verificarToken, verificarRol('admin'), tarifaCtrl.getCuotasImpagasPorUsuario);
router.post('/', verificarToken, verificarRol('admin'), tarifaCtrl.createTarifa); 
router.patch('/:id/anular', verificarToken, verificarRol('admin'), tarifaCtrl.anularTarifa);

module.exports = router;