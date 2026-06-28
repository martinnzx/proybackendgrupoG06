const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('./../models/usuario.model');

const authCtrl = {};

// Login de usuario
authCtrl.login = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: '0', errors: errors.array() });
        }
        
        const usuario = await Usuario.findOne({ where: { email: req.body.email } });
        
        if (!usuario) {
            return res.status(401).json({ status: '0', msg: 'Credenciales inválidas.' });
        }
        
        if (!usuario.estado) {
            return res.status(403).json({ status: '0', msg: 'El usuario se encuentra inactivo. Contacte al administrador.' });
        }
        
        const passwordValida = await bcrypt.compare(req.body.password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ status: '0', msg: 'Credenciales inválidas.' });
        }
        
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, estado: usuario.estado },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        
        res.json({
            status: '1',
            msg: 'Login exitoso.',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al procesar el login.' });
    }
};

module.exports = authCtrl;