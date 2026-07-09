const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('./../models/usuario.model');
const Rol = require('./../models/rol.model');
const UsuarioRol = require('./../models/usuarioRol.model');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const emailService = require('./../services/email.service');

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
        
        let nombreRol = null;
        const asignacion = await UsuarioRol.findOne({ 
            where: { id_usuario: usuario.id },
            order: [['id_rol', 'ASC']]
        });
        if (asignacion) {
            const rolEncontrado = await Rol.findByPk(asignacion.id_rol);
            if (rolEncontrado) {
                nombreRol = rolEncontrado.nombre;
            }
        }

        res.json({
            status: '1',
            msg: 'Login exitoso.',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: nombreRol
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al procesar el login.' });
    }
};

// Login con Google
authCtrl.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const { email, given_name, family_name } = payload;

        let usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            const dummyDni = payload.sub ? payload.sub.slice(-8) : String(Math.floor(Math.random() * 100000000));
            
            usuario = await Usuario.create({
                nombre: given_name,
                apellido: family_name || '',
                email: email,
                dni: dummyDni,
                password_hash: 'GOOGLE_AUTH',
                google_id: payload.sub,
                estado: true
            });
            
            await UsuarioRol.create({ id_usuario: usuario.id, id_rol: 3 });

            await emailService.enviarBienvenida(email, given_name);
        }
        if (!usuario.estado) {
            return res.status(403).json({ status: '0', msg: 'Usuario inactivo.' });
        }
        
        let nombreRol = null;
        const asignacion = await UsuarioRol.findOne({ 
            where: { id_usuario: usuario.id },
            order: [['id_rol', 'ASC']]
        });
        if (asignacion) {
            const rolEncontrado = await Rol.findByPk(asignacion.id_rol);
            if (rolEncontrado) {
                nombreRol = rolEncontrado.nombre;
            }
        }

        const tokenLocal = jwt.sign(
            { id: usuario.id, email: usuario.email, estado: usuario.estado },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        res.json({
            status: '1',
            msg: 'Login con Google exitoso.',
            token: tokenLocal,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: nombreRol
            }
        });
    } catch (error) {
        console.error("Error en Google Login:", error);
        res.status(401).json({ status: '0', msg: 'Token de Google inválido o expirado.' });
    }
};

module.exports = authCtrl;