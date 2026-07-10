const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model'); 

const Suscripcion = sequelize.define('Suscripcion', { 
  fecha_inicio: {type: DataTypes.STRING, allowNull: false}, 
  fecha_fin: {type: DataTypes.STRING, allowNull: false}, 
  precio: {type: DataTypes.STRING, allowNull: false}, 
  activo: {type: DataTypes.BOOLEAN, allowNull: false}, 
}, { 
    tableName: 'suscripciones',
    timestamps: true, 
}); 
 
Suscripcion.belongsTo(Usuario, { as : 'usuario' });

module.exports = Suscripcion; 
