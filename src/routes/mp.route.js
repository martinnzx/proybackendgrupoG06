//creamos el manejador de rutas 
const express = require('express'); 
const mpCtrl = require('../controllers/mp.controller'); 
const router = express.Router(); 
 
//definimos las rutas para la gestion de un pago unico em mercado pago 
router.post('/payment', mpCtrl.getPaymentlink); 
 
//definimos las rutas para la gestion de un pago por suscripcion en mercado pago 
//ej. pagar todos los meses $ 10.000 
router.post('/subscription', mpCtrl.getSubscriptionLink); 
 
//exportamos el modulo de rutas 
module.exports = router; 