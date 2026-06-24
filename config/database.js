const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pysw_tpfinal_g06', 'postgres', 'Martin24', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('La base de datos está conectada a PostgreSQL'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

module.exports = sequelize;