const Usuario = require('./../src/models/usuario.model');
const Rol = require('./../src/models/rol.model');
const UsuarioRol = require('./../src/models/usuarioRol.model');

Usuario.belongsToMany(Rol, {
    through: UsuarioRol,
    foreignKey: 'id_usuario',
    otherKey: 'id_rol'
});

Rol.belongsToMany(Usuario, {
    through: UsuarioRol,
    foreignKey: 'id_rol',
    otherKey: 'id_usuario'
});

UsuarioRol.belongsTo(Usuario, { foreignKey: 'id_usuario' });
UsuarioRol.belongsTo(Rol, { foreignKey: 'id_rol' });