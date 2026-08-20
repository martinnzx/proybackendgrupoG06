require('dotenv').config();
const { Sequelize } = require('sequelize');
const Usuario = require('./src/models/usuario.model');

// Conectamos a Render usando tu .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    logging: false
});

async function hacerAdmin() {
    const dni = '44349895'; // Tu DNI
    
    const user = await Usuario.findOne({ where: { dni } });
    if (!user) return console.log('Usuario no encontrado');

    // Usar query directa para evitar el problema del modelo UsuarioRol
    await sequelize.query('INSERT INTO usuario_roles (id_usuario, id_rol) VALUES (:id_usuario, :id_rol)', {
        replacements: { id_usuario: user.id, id_rol: 1 }
    });
    console.log('¡Listo! Ya eres admin. Vuelve a iniciar sesión.');
    process.exit(0);
}
hacerAdmin();
