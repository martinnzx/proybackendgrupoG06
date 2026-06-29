const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Suscripcion = require('./suscripcion.model'); // Asegúrate de que la ruta apunte a tu modelo

const Tarifa = sequelize.define('Tarifa', { 
  // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo 
  anio: {type: DataTypes.STRING, allowNull: false}, 
  mes: {type: DataTypes.STRING, allowNull: false}, 
  precio: {type: DataTypes.STRING, allowNull: false}, 
  pagado: {type: DataTypes.BOOLEAN, allowNull: false}, 
  activo:{type: DataTypes.BOOLEAN, allowNull: false},   
}, { 
    tableName: 'tarifas', // Nombre de la tabla en minúsculas y plural
    timestamps: true,      // Crea automáticamente los campos createdAt y updatedAt 
}); 
 
Tarifa.belongsTo(Suscripcion, { as : 'suscripcion' });

module.exports = Tarifa; 
