const Rol = require('./../models/rol.model');
const Usuario = require('./../models/usuario.model');
const { validationResult } = require('express-validator');

const rolCtrl = {};

// Obtener todos los roles
rolCtrl.getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.json({ status: '1', msg: 'Roles obtenidos correctamente.', roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener los roles.' });
    }
};

// Crear un rol nuevo
rolCtrl.createRol = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: '0', errors: errors.array() });
        }
        const rolExistente = await Rol.findOne({ where: { nombre: req.body.nombre } });
        if (rolExistente) {
            return res.json({ status: '0', msg: `El rol "${req.body.nombre}" ya existe.` });
        }
        const rol = await Rol.create({ nombre: req.body.nombre });
        res.json({ status: '1', msg: 'Rol creado correctamente.', rol });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al crear el rol.' });
    }
};

// Obtener los roles de un usuario especifico
rolCtrl.getRolesByUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
        }
        const roles = await usuario.getRoles({
            attributes: { exclude: ['id'] },
            joinTableAttributes: []
        });
        res.json({ status: '1', msg: 'Roles del usuario obtenidos correctamente.', roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener los roles del usuario.' });
    }
};

// Asignar un rol a un usuario
rolCtrl.assignRolToUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
        }

        const rol = await Rol.findOne({ where: { nombre: req.params.nombre } });
        if (!rol) {
            return res.status(404).json({ status: '0', msg: 'Rol no encontrado.' });
        }

        const yaTieneRol = await usuario.hasRol(rol);
        if (yaTieneRol) {
            return res.json({ status: '0', msg: `El usuario ya tiene el rol "${rol.nombre}".` });
        }

        await usuario.addRol(rol);
        res.json({ status: '1', msg: `Rol "${rol.nombre}" asignado correctamente.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al asignar el rol.' });
    }
};


// Quitar un rol de un usuario
rolCtrl.removeRolFromUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { dni: req.params.dni } });
        if (!usuario) {
            return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
        }

        const rol = await Rol.findOne({ where: { nombre: req.params.nombre } });
        if (!rol) {
            return res.status(404).json({ status: '0', msg: 'Rol no encontrado.' });
        }

        await usuario.removeRol(rol);
        res.json({ status: '1', msg: `Rol "${rol.nombre}" quitado correctamente.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al quitar el rol.' });
    }
};

module.exports = rolCtrl;