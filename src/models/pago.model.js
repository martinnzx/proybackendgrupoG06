const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Tarifa = require('./tarifa.model'); // Asegúrate de que la ruta apunte a tu modelo

const Pago = sequelize.define('Pago', { 
  // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo 
  fecha: {type: DataTypes.STRING, allowNull: false}, 
  transaccion: {type: DataTypes.STRING, allowNull: false}, 
  monto: {type: DataTypes.STRING, allowNull: false}, 
  activo:{type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'pagos', // Nombre de la tabla en minúsculas y plural
    timestamps: true,      // Crea automáticamente los campos createdAt y updatedAt 
}); 
 
Pago.belongsTo(Tarifa, { as : 'tarifa' });

module.exports = Pago; 
