//creamos el manejador de rutas 
const express = require('express'); 
const mpCtrl = require('../controllers/mp.controller'); 
const router = express.Router(); 

const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');
 
//definimos las rutas para la gestion de un pago unico em mercado pago 
router.post('/payment', verificarToken, verificarRol('admin'), mpCtrl.getPaymentlink); 
 
//definimos las rutas para la gestion de un pago por suscripcion en mercado pago 
//ej. pagar todos los meses $ 10.000 
router.post('/subscription', verificarToken, verificarRol('admin'), mpCtrl.getSubscriptionLink); 
 
//exportamos el modulo de rutas 
module.exports = router; 