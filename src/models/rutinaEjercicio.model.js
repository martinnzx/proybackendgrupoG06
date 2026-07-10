const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const RutinaEjercicio = sequelize.define('RutinaEjercicio', {
    id_rutina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rutinas',
            key: 'id'
        }
    },
    id_ejercicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ejercicios',
            key: 'id'
        }
    }
}, {
    tableName: 'rutina_ejercicios',
    timestamps: false
});

module.exports = RutinaEjercicio;
