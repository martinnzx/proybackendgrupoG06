require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

var app = express();

// Middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Associations
require('./config/associations');

// Swagger 
const swaggerUi = require('swagger-ui-express'); 
const swaggerFile = require('./swagger_output.json');

// Routes
app.use('/api/usuarios', require('./src/routes/usuario.route.js'));
app.use('/api/auth', require('./src/routes/auth.route.js'));
app.use('/api/roles', require('./src/routes/rol.route'));

app.use('/api/ejercicio', require('./src/routes/ejercicio.route.js')); 
app.use('/api/rutina', require('./src/routes/rutina.route.js')); 
app.use('/api/suscripcion', require('./src/routes/suscripcion.route.js')); 
app.use('/api/tarifa', require('./src/routes/tarifa.route.js')); 
app.use('/api/pago', require('./src/routes/pago.route.js')); 

// Ruta hacia la documentacion de swagger 
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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