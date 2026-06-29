const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Usuario = require('./usuario.model'); // Asegúrate de que la ruta apunte a tu modelo
const Ejercicio = require('./ejercicio.model'); // Asegúrate de que la ruta apunte a tu modelo


const Rutina = sequelize.define('Rutina', { 
  // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo 
  dia_semana: {type: DataTypes.STRING, allowNull: false}, 
  turno: {type: DataTypes.STRING, allowNull: false}, 
  nombre: {type: DataTypes.STRING, allowNull: false}, 
  descripcion: {type: DataTypes.STRING, allowNull: false}, 
  activo:{type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'rutinas', // Nombre de la tabla en minúsculas y plural
    timestamps: true,      // Crea automáticamente los campos createdAt y updatedAt 
}); 
 
Rutina.belongsTo(Usuario, { as : 'usuario' });
Rutina.belongsTo(Ejercicio, { as : 'ejercicio' });

module.exports = Rutina; 

