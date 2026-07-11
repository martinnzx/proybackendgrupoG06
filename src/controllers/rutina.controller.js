const Rutina    = require('./../../src/models/rutina.model');
const Ejercicio = require('./../../src/models/ejercicio.model');
const Usuario   = require('./../../src/models/usuario.model');
const { sendRutinaNotification } = require('../services/email.service');

const rutinaCtrl = {}; 

// Crear una nueva rutina 
rutinaCtrl.createRutina = async (req, res) => { 
  try { 
    const data = req.body;

    if (data.usuario && data.usuario.id) { 
        data.usuarioId = data.usuario.id;

        if (data.ejercicios && Array.isArray(data.ejercicios) && data.ejercicios.length > 0) {
            const nuevaRutina = await Rutina.create(data); 
            
            const ejercicioIds = data.ejercicios.map(e => e.id);
            await nuevaRutina.addEjercicios(ejercicioIds);

            const usuarioObj = await Usuario.findByPk(data.usuario.id);
            if (usuarioObj && usuarioObj.email) {
                sendRutinaNotification(usuarioObj.email, usuarioObj.nombre, nuevaRutina.nombre);
            }

            res.json({ status: '1', msg: 'Rutina guardada.' }); 
        }
        else {
            res.status(400).json({ status: '0', msg: 'Falta al menos un ejercicio asociado.' }); 
        }

    }
    else {
        res.status(400).json({ status: '0', msg: 'Falta usuario asociado.' }); 
    }

  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 



// Obtener todos las rutinas
rutinaCtrl.getRutinas = async (req, res) => { 
  try { 

    const { idUsuario, idEjercicio } = req.query;
    const whereClause = {};

    if (idUsuario) whereClause.usuarioId = idUsuario;
    
    const rutinas = await Rutina.findAll({
        include: [
            {
                model: Ejercicio, 
                as: 'ejercicios', 
                attributes: ['id', 'nombre', 'descripcion', 'youtube_url', 'activo'],
                through: { attributes: [] },
                ...(idEjercicio ? { where: { id: idEjercicio } } : {})
            },
            {
                model: Usuario, 
                as: 'usuario', 
                attributes: ['id', 'nombre', 'apellido', 'email']
            }
        ], 
        where: whereClause
    });
    res.json(rutinas); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener las rutinas.' }); 
  } 
}; 

// Obtener las rutinas del socio logueado
rutinaCtrl.getMisRutinas = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const rutinas = await Rutina.findAll({
            include: [
                { 
                    model: Ejercicio, 
                    as: 'ejercicios', 
                    attributes: ['id', 'nombre', 'descripcion', 'youtube_url', 'activo'],
                    through: { attributes: [] }
                }
            ],
            where: { usuarioId }
        });
        res.json(rutinas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener tus rutinas.' });
    }
};
 
// Eliminar una rutina
rutinaCtrl.deleteRutina = async (req, res) => { 
  try { 
    await Rutina.destroy({ 
      where: { id: req.params.id } 
    }); 
    res.json({ status: '1', msg: 'Rutina eliminada' }); 
  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' }); 
  } 
}; 

// Editar una rutina 
rutinaCtrl.editRutina = async (req, res) => {  
    const data = req.body;
    try {
        const rutina = await Rutina.findByPk(req.params.id);

        if (rutina) {
            if (data.usuario && data.usuario.id) {
                data.usuarioId = data.usuario.id;

                if (data.ejercicios && Array.isArray(data.ejercicios) && data.ejercicios.length > 0) {
                    await rutina.update(data);
                    
                    const ejercicioIds = data.ejercicios.map(e => e.id);
                    await rutina.setEjercicios(ejercicioIds);

                    res.json({ status: '1', msg: 'Rutina actualizada.' });
                }
                else {
                    res.status(400).json({ status: '0', msg: 'Falta al menos un ejercicio asociado.' }); 
                }

            }
            else {
                res.status(400).json({ status: '0', msg: 'Falta el usuario asociado.' }); 
            }
        } else {
            res.status(404).json({ error: 'Rutina no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la rutina:', error);
        res.status(500).json({ error: 'Error al actualizar la rutina' });
    }
};

module.exports = rutinaCtrl; 