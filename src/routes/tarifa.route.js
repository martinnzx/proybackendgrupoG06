//defino controlador para el manejo de CRUD 
const tarifaCtrl = require('../controllers/tarifa.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

//definimos las rutas para la gestion de tarifas
 
router.get('/', verificarToken, verificarRol('admin'), tarifaCtrl.getTarifas); 
router.get('/mis-tarifas', verificarToken, verificarRol('socio'), tarifaCtrl.getMisTarifas); 
router.get('/impagas/:usuarioId', verificarToken, verificarRol('admin'), tarifaCtrl.getCuotasImpagasPorUsuario);
router.post('/', verificarToken, verificarRol('admin'), tarifaCtrl.createTarifa); 
router.patch('/:id/anular', verificarToken, verificarRol('admin'), tarifaCtrl.anularTarifa);

//exportamos el modulo de rutas 
module.exports = router;