
const ejercicioCtrl = require('../controllers/ejercicio.controller'); 

const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.get('/', verificarToken, verificarRol('entrenador'), ejercicioCtrl.getEjercicios); 
router.post('/', verificarToken, verificarRol('entrenador'), ejercicioCtrl.createEjercicio); 
router.put('/:id', verificarToken, verificarRol('entrenador'), ejercicioCtrl.editEjercicio); 
router.delete('/:id', verificarToken, verificarRol('entrenador'), ejercicioCtrl.deleteEjercicio); 

module.exports = router;