//defino controlador para el manejo de CRUD 
const pagoCtrl = require('../controllers/pago.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
//definimos las rutas para la gestion de pagos
 
router.get('/', pagoCtrl.getPagos); 
router.post('/', pagoCtrl.createPago); 

//exportamos el modulo de rutas 
module.exports = router;