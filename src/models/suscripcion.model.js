const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Usuario = require('./usuario.model'); // Asegúrate de que la ruta apunte a tu modelo

const Suscripcion = sequelize.define('Suscripcion', { 
  // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo 
  fecha_inicio: {type: DataTypes.STRING, allowNull: false}, 
  fecha_fin: {type: DataTypes.STRING, allowNull: false}, 
  precio: {type: DataTypes.STRING, allowNull: false}, 
  activo: {type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'suscripciones', // Nombre de la tabla en minúsculas y plural
    timestamps: true,      // Crea automáticamente los campos createdAt y updatedAt 
}); 
 
Suscripcion.belongsTo(Usuario, { as : 'usuario' });

module.exports = Suscripcion; 
