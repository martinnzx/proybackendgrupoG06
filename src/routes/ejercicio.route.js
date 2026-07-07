//defino controlador para el manejo de CRUD 
const ejercicioCtrl = require('../controllers/ejercicio.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

//definimos las rutas para la gestion de ejercicios 
router.get('/', verificarToken, verificarRol('entrenador'), ejercicioCtrl.getEjercicios); 
router.post('/', verificarToken, verificarRol('entrenador'), ejercicioCtrl.createEjercicio); 
router.put('/:id', verificarToken, verificarRol('entrenador'), ejercicioCtrl.editEjercicio); 
router.delete('/:id', verificarToken, verificarRol('entrenador'), ejercicioCtrl.deleteEjercicio); 

//exportamos el modulo de rutas 
module.exports = router;