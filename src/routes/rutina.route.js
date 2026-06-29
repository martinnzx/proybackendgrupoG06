//defino controlador para el manejo de CRUD 
const rutinaCtrl = require('../controllers/rutina.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
//definimos las rutas para la gestion de rutinas
 
router.get('/', rutinaCtrl.getRutinas); 
router.post('/', rutinaCtrl.createRutina); 

//exportamos el modulo de rutas 
module.exports = router;