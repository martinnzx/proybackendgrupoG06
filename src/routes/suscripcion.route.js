
const suscripcionCtrl = require('../controllers/suscripcion.controller');

const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

router.get('/', verificarToken, verificarRol('admin'), suscripcionCtrl.getSuscripciones); 
router.post('/', verificarToken, verificarRol('admin'), suscripcionCtrl.createSuscripcion); 
router.patch('/:id', verificarToken, verificarRol('admin'), suscripcionCtrl.editSuscripcion); 
router.delete('/:id', verificarToken, verificarRol('admin'), suscripcionCtrl.deleteSuscricion);

module.exports = router;