
const pagoCtrl = require('../controllers/pago.controller');

const express = require('express'); 
const router = express.Router(); 
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');

 
router.get('/', verificarToken, verificarRol('admin'), pagoCtrl.getPagos); 
router.post('/', verificarToken, verificarRol(['admin', 'socio']), pagoCtrl.createPago); 
router.patch('/:id/anular', verificarToken, verificarRol('admin'), async (req, res) => {
    try {
        const result = await pagoCtrl.anularPago(req.params.id);
        res.json(result);
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ status: '0', msg: error.message || 'Error procesando la operacion' });
    }
}); 

module.exports = router;