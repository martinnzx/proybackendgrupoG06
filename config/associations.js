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

const Rutina = require('./../src/models/rutina.model');
const Ejercicio = require('./../src/models/ejercicio.model');
const RutinaEjercicio = require('./../src/models/rutinaEjercicio.model');

Rutina.belongsToMany(Ejercicio, {
    through: RutinaEjercicio,
    foreignKey: 'id_rutina',
    otherKey: 'id_ejercicio',
    as: 'ejercicios'
});

Ejercicio.belongsToMany(Rutina, {
    through: RutinaEjercicio,
    foreignKey: 'id_ejercicio',
    otherKey: 'id_rutina',
    as: 'rutinas'
});

RutinaEjercicio.belongsTo(Rutina, { foreignKey: 'id_rutina' });
RutinaEjercicio.belongsTo(Ejercicio, { foreignKey: 'id_ejercicio' });