 
const rutinaCtrl = require('../controllers/rutina.controller');

const express = require('express'); 
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.get('/', verificarToken, verificarRol('entrenador'), rutinaCtrl.getRutinas); 
router.get('/mis-rutinas', verificarToken, verificarRol('socio'), rutinaCtrl.getMisRutinas); 
router.post('/', verificarToken, verificarRol('entrenador'), rutinaCtrl.createRutina); 
router.put('/:id', verificarToken, verificarRol('entrenador'), rutinaCtrl.editRutina);
router.delete('/:id', verificarToken, verificarRol('entrenador'), rutinaCtrl.deleteRutina);

module.exports = router;