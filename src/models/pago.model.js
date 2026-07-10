const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database');
const Tarifa = require('./tarifa.model'); 

const Pago = sequelize.define('Pago', { 
  fecha: {type: DataTypes.STRING, allowNull: false}, 
  transaccion: {type: DataTypes.STRING, allowNull: false}, 
  monto: {type: DataTypes.STRING, allowNull: false}, 
  activo:{type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'pagos',
    timestamps: true,
}); 
 
Pago.belongsTo(Tarifa, { as : 'tarifa' });

module.exports = Pago; 
