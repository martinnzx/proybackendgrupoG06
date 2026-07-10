const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database');
const Ejercicio = sequelize.define('Ejercicio', { 
  nombre: {type: DataTypes.STRING, allowNull: false}, 
  descripcion: {type: DataTypes.STRING, allowNull: false}, 
  youtube_url: {type: DataTypes.STRING, allowNull: false}, 
  activo: {type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'ejercicios',
    timestamps: true,     
}); 
 
module.exports = Ejercicio; 
