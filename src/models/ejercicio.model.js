const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Ejercicio = sequelize.define('Ejercicio', { 
  // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo 
  nombre: {type: DataTypes.STRING, allowNull: false}, 
  descripcion: {type: DataTypes.STRING, allowNull: false}, 
  youtube_url: {type: DataTypes.STRING, allowNull: false}, 
  activo: {type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'ejercicios', // Nombre de la tabla en minúsculas y plural
    timestamps: true,      // Crea automáticamente los campos createdAt y updatedAt 
}); 
 
module.exports = Ejercicio; 
