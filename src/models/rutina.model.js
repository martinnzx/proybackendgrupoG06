const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); 
const Usuario = require('./usuario.model'); 
const Ejercicio = require('./ejercicio.model');

const Rutina = sequelize.define('Rutina', { 
  dia_semana: {type: DataTypes.STRING, allowNull: false}, 
  turno: {type: DataTypes.STRING, allowNull: false}, 
  nombre: {type: DataTypes.STRING, allowNull: false}, 
  descripcion: {type: DataTypes.STRING, allowNull: false}, 
  activo:{type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'rutinas', 
    timestamps: true,     
}); 
 
Rutina.belongsTo(Usuario, { as : 'usuario' });

module.exports = Rutina;