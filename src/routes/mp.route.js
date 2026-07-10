
const express = require('express'); 
const mpCtrl = require('../controllers/mp.controller'); 
const router = express.Router(); 

const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');
 
router.post('/payment', verificarToken, verificarRol(['admin', 'socio']), mpCtrl.getPaymentlink); 
 
router.post('/subscription', verificarToken, verificarRol('admin'), mpCtrl.getSubscriptionLink); 
 
module.exports = router; 