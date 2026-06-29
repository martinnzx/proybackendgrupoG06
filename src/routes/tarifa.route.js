//defino controlador para el manejo de CRUD 
const tarifaCtrl = require('../controllers/tarifa.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
//definimos las rutas para la gestion de tarifas
 
router.get('/', tarifaCtrl.getTarifas); 
router.post('/', tarifaCtrl.createTarifa); 

//exportamos el modulo de rutas 
module.exports = router;