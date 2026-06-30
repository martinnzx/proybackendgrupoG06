const Rol = require('./../models/rol.model');
const UsuarioRol = require('./../models/usuarioRol.model');

// Middleware Factory
const verificarRol = (rolRequerido) => {
    return async (req, res, next) => {
        try {

            const rol = await Rol.findOne({ where: { nombre: rolRequerido } });
            if (!rol) {
                return res.status(500).json({
                    status: '0',
                    msg: `El rol "${rolRequerido}" no existe en el sistema.`
                });
            }

            const asignacion = await UsuarioRol.findOne({
                where: {
                    id_usuario: req.usuario.id,
                    id_rol: rol.id
                }
            });

            if (!asignacion) {
                return res.status(403).json({
                    status: '0',
                    msg: `Acceso denegado. Se requiere el rol "${rolRequerido}".`
                });
            }

            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: '0', msg: 'Error al verificar el rol.' });
        }
    };
};

module.exports = verificarRol;