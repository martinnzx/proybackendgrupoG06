//defino controlador para el manejo de CRUD 
const pagoCtrl = require('../controllers/pago.controller'); // Asegúrate de usar la ruta correcta a tu controlador
//creamos el manejador de rutas  
const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

//definimos las rutas para la gestion de pagos
 
router.get('/', verificarToken, verificarRol('admin'), pagoCtrl.getPagos); 
router.post('/', verificarToken, verificarRol('admin'), pagoCtrl.createPago); 
router.patch('/:id/anular', verificarToken, verificarRol('admin'), async (req, res) => {
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