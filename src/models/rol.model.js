const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');

const Rol = sequelize.define('Rol', {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    tableName: 'roles',
    timestamps: false,
    name: {
        singular: 'rol',
        plural: 'roles'
    }
});

module.exports = Rol;