const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database');
const Suscripcion = require('./suscripcion.model');

const Tarifa = sequelize.define('Tarifa', { 
  anio: {type: DataTypes.STRING, allowNull: false}, 
  mes: {type: DataTypes.STRING, allowNull: false}, 
  precio: {type: DataTypes.STRING, allowNull: false}, 
  pagado: {type: DataTypes.BOOLEAN, allowNull: false}, 
  activo:{type: DataTypes.BOOLEAN, allowNull: false},   
}, { 
    tableName: 'tarifas',
    timestamps: true, 
}); 
 
Tarifa.belongsTo(Suscripcion, { as : 'suscripcion' });

module.exports = Tarifa; 
