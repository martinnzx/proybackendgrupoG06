require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

var app = express();

// Middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/usuarios', require('./src/routes/usuario.route'));

// Setting
app.set('port', process.env.PORT || 3000);

// Starting the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas de PostgreSQL sincronizadas');
        
        app.listen(app.get('port'), () => {
            console.log(`Servidor iniciado en el puerto`, app.get('port'));
        });
    })
    .catch(err => {
        console.error('No se pudo iniciar el servidor debido a un error en la BD:', err);
});