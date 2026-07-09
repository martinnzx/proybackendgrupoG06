//defino controlador para el manejo de CRUD 
const rutinaCtrl = require('../controllers/rutina.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

//definimos las rutas para la gestion de rutinas
router.get('/', verificarToken, verificarRol('entrenador'), rutinaCtrl.getRutinas); 
router.get('/mis-rutinas', verificarToken, verificarRol('socio'), rutinaCtrl.getMisRutinas); 
router.post('/', verificarToken, verificarRol('entrenador'), rutinaCtrl.createRutina); 
router.put('/:id', verificarToken, verificarRol('entrenador'), rutinaCtrl.editRutina);
router.delete('/:id', verificarToken, verificarRol('entrenador'), rutinaCtrl.deleteRutina);

//exportamos el modulo de rutas 
module.exports = router;