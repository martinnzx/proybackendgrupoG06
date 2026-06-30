const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');

const UsuarioRol = sequelize.define('UsuarioRol', {

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },

    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    }

}, {
    tableName: 'usuario_roles',
    timestamps: false
});

module.exports = UsuarioRol;