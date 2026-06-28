const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Usuario = require('./../../src/models/usuario.model');
const usuarioCtrl = {};

// Alta de nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: '0', errors: errors.array() });
        }

        const usuarioExistente = await Usuario.findOne({ where: { dni: req.body.dni } });
        if (usuarioExistente) {
            return res.json({status: '0', msg: `El usuario con el DNI ${req.body.dni} ya se encuentra registrado.`});
        } 
        
        const password_hash = await bcrypt.hash(req.body.password, 10)
        
        await Usuario.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            email: req.body.email,
            password_hash: password_hash,
            google_id: req.body.google_id || null
        });
        res.json({status: '1', msg: 'Usuario creado correctamente.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al procesar la peticion de alta'});
    }
};

// Obtener todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password_hash', 'createdAt', 'updatedAt'] }
        });
        res.json({status: '1', msg: 'Usuarios obtenidos correctamente.', usuarios});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al obtener los usuarios'});
    }
};

// Obtener usuario por DNI
usuarioCtrl.getUsuarioByDni = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: { dni: req.params.dni },
            attributes: { exclude: ['password_hash', 'createdAt', 'updatedAt'] }
        });
        if (usuario) {
            res.json({status: '1', msg: 'Usuario obtenido correctamente.', usuario});
        } else {
            res.status(404).json({status: '0', msg: 'Usuario no encontrado'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al obtener el usuario'});
    }
};

// Modificar un usuario
usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status: '0', errors: errors.array()});
        }

        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({status: '0', msg: 'Usuario no encontrado'});
        } 

        const datosActualizados = { ...req.body };
        if (req.body.password) {
            datosActualizados.password_hash = await bcrypt.hash(req.body.password, 10);
            delete datosActualizados.password;
        }

        await usuario.update(datosActualizados);
        res.json({status: '1', msg: 'Usuario modificado correctamente.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al modificar el usuario'});
    }
};

// Eliminar un usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({status: '0', msg: 'Usuario no encontrado'});
        }
        await usuario.destroy();
        res.json({status: '1', msg: 'Usuario eliminado correctamente.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al eliminar el usuario'});
    }
};

// Inactivar usuario (baja logica)
usuarioCtrl.inactiveUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({status: '0', msg: 'Usuario no encontrado'});
        }
        await usuario.update({ estado: false });
        res.json({status: '1', msg: 'Usuario inactivado correctamente.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al inactivar el usuario'});
    }
};

// Activar usuario
usuarioCtrl.activeUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({status: '0', msg: 'Usuario no encontrado'});
        }
        await usuario.update({ estado: true });
        res.json({status: '1', msg: 'Usuario activado correctamente.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: '0', msg: 'Error al activar el usuario'});
    }
};

module.exports = usuarioCtrl;