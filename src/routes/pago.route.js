//defino controlador para el manejo de CRUD 
const pagoCtrl = require('../controllers/pago.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
//definimos las rutas para la gestion de pagos
 
router.get('/', pagoCtrl.getPagos); 
router.post('/', pagoCtrl.createPago); 
router.patch('/:id/anular', async (req, res) => {
    try {
        const result = await pagoCtrl.anularPago(req.params.id);
        res.json(result);
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ status: '0', msg: error.message || 'Error procesando la operacion' });
    }
}); 

//exportamos el modulo de rutas 
module.exports = router;