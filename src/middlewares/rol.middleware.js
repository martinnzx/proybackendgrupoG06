const Rol = require('./../models/rol.model');
const UsuarioRol = require('./../models/usuarioRol.model');

const verificarRol = (rolesRequeridos) => {
    return async (req, res, next) => {
        try {
            const rolesArray = Array.isArray(rolesRequeridos) ? rolesRequeridos : [rolesRequeridos];

            let tienePermiso = false; 

            for (let nombreRol of rolesArray) {
                
                const rolDB = await Rol.findOne({ where: { nombre: nombreRol } });
                
                if (rolDB) {
                    const asignacion = await UsuarioRol.findOne({
                        where: {
                            id_usuario: req.usuario.id,
                            id_rol: rolDB.id
                        }
                    });

                    if (asignacion) {
                        tienePermiso = true;
                        break; 
                    }
                }
            }

            if (!tienePermiso) {
                return res.status(403).json({
                    status: '0',
                    msg: `Acceso denegado. Se requiere alguno de estos roles: ${rolesArray.join(' o ')}.`
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