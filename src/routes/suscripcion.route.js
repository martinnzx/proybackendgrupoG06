//defino controlador para el manejo de CRUD 
const suscripcionCtrl = require('../controllers/suscripcion.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

//definimos las rutas para la gestion de suscripciones
router.get('/', verificarToken, verificarRol('admin'), suscripcionCtrl.getSuscripciones); 
router.post('/', verificarToken, verificarRol('admin'), suscripcionCtrl.createSuscripcion); 
router.patch('/:id', verificarToken, verificarRol('admin'), suscripcionCtrl.editSuscripcion); 
router.delete('/:id', verificarToken, verificarRol('admin'), suscripcionCtrl.deleteSuscricion);

//exportamos el modulo de rutas 
module.exports = router;