const Usuario = require('../models/usuario.model');
const Rol = require('../models/rol.model');
const Tarifa = require('../models/tarifa.model');
const sequelize = require('../../config/database');

const dashboardCtrl = {};

dashboardCtrl.getStats = async (req, res) => {
    try {
        // 1. Usuarios por Estado
        const usuariosActivos = await Usuario.count({ where: { estado: true } });
        const usuariosInactivos = await Usuario.count({ where: { estado: false } });

        // 2. Ingresos Totales
        const tarifasPagadas = await Tarifa.findAll({ 
            where: { pagado: true, activo: true },
            attributes: ['precio']
        });
        const ingresosTotales = tarifasPagadas.reduce((sum, t) => sum + Number(t.precio), 0);

        // 3. Usuarios por Rol
        const roles = await Rol.findAll({
            include: [{
                model: Usuario,
                attributes: ['id'],
                through: { attributes: [] }
            }]
        });

        let admins = 0;
        let entrenadores = 0;
        let socios = 0;

        roles.forEach(rol => {
            // Sequelize por defecto asigna el nombre en plural capitalizado si no hay 'as'
            const count = (rol.Usuarios || rol.usuarios || []).length;
            if (rol.nombre === 'admin') admins = count;
            if (rol.nombre === 'entrenador') entrenadores = count;
            if (rol.nombre === 'socio') socios = count;
        });

        res.json({
            status: '1',
            msg: 'Estadísticas obtenidas',
            data: {
                usuarios: {
                    total: usuariosActivos + usuariosInactivos,
                    activos: usuariosActivos,
                    inactivos: usuariosInactivos
                },
                roles: {
                    admins,
                    entrenadores,
                    socios
                },
                finanzas: {
                    ingresosTotales
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener estadísticas del dashboard.' });
    }
};

module.exports = dashboardCtrl;
