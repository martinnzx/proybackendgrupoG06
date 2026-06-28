const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    google_id: { type: DataTypes.STRING, allowNull: true },
    estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
    tableName: 'usuarios',
    timestamps: true
});

module.exports = Usuario;