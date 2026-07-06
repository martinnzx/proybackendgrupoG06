const Rutina    = require('./../../src/models/rutina.model'); // Asegúrate de usar la ruta 
const Ejercicio = require('./../../src/models/ejercicio.model'); // Asegúrate de usar la ruta 
const Usuario   = require('./../../src/models/usuario.model'); // Asegúrate de usar la ruta 

const rutinaCtrl = {}; 


// Crear una nueva rutina 
rutinaCtrl.createRutina = async (req, res) => { 
    /* 
        #swagger.tags = ['Rutinas'] 
        #swagger.summary = 'Agregar una rutina' 
        #swagger.description = 'Agrega una rutina.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos de la rutina a agregar.', 
            required: true, 
            schema: { $ref: '#/definitions/Rutina' }  
        } 
        #swagger.responses[200] = { 
            description: 'Rutina agregado correctamente.', 
            schema: { $ref: '#/definitions/Rutina' } 
        } 
    */    

  try { 
    const data = req.body;

    if (data.usuario  && data.usuario.id) { 
        data.usuarioId = data.usuario.id;

        if (data.ejercicio  && data.ejercicio.id) {
            data.ejercicioId = data.ejercicio.id;

            await Rutina.create(req.body); 
            res.json({ status: '1', msg: 'Rutina guardada.' }); 
        }
        else {
            res.status(400).json({ status: '0', msg: 'Falta ejercicio asociado.' }); 
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
    /* 
        #swagger.tags = ['Rutinas'] 
        #swagger.summary = 'Obtener todas las rutinas' 
        #swagger.description = 'Retorna una lista de rutinas. Parámetros opcionales: idUsuario, idEjercicio.' 
        #swagger.responses[200] = { 
            description: 'Lista de rutinas obtenida con éxito.', 
            schema: { $ref: '#/definitions/Rutinas' } 
        } 
    */

  try { 

    const { idUsuario, idEjercicio } = req.query;
    const whereClause = {};

    if (idUsuario) whereClause.usuarioId = idUsuario;
    if (idEjercicio) whereClause.ejercicioId = idEjercicio;

    const rutinas = await Rutina.findAll(
            {include: [
           {model: Ejercicio, as: 'ejercicio', attributes: ['nombre','descripcion' , 'youtube_url', 'activo']},
           {model: Usuario, as: 'usuario', attributes: ['nombre','apellido' , 'email']}
        ], where: whereClause}
    ); 
    res.json(rutinas); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener las rutinas.' }); 
  } 
}; 
 
// Eliminar una rutina
rutinaCtrl.deleteRutina = async (req, res) => { 

    /* 
        #swagger.tags = ['Rutinas'] 
        #swagger.summary = 'Eliminar una rutina' 
        #swagger.description = 'Elimina una rutina de la lista de rutinas.' 
        #swagger.parameters['id'] = { 
            in: 'path', 
            description: 'ID de la rutina a eliminar.', 
            required: true, 
            type: 'string' 
        } 
        #swagger.responses[200] = { 
            description: 'Rutina eliminada correctamente.'
        } 
    */

  try { 
    // .destroy() elimina el registro que coincida con el ID enviado por parámetro 
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

/* 
        #swagger.tags = ['Rutinas'] 
        #swagger.summary = 'Modificar una rutina' 
        #swagger.description = 'Modifica los datos de una rutina existente.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos de la rutina a modificar.', 
            required: true, 
            schema: { $ref: '#/definitions/Rutina' }  
        } 
        #swagger.responses[200] = { 
            description: 'Rutina modificada correctamente.', 
            schema: { $ref: '#/definitions/Rutina' } 
        } 
    */    

    const data = req.body;
    try {
        const rutina = await Rutina.findByPk(req.params.id);

        if (rutina) {
            if (data.usuario && data.usuario.id) {
                data.usuarioId = data.usuario.id;

                    if (data.ejercicio && data.ejercicio.id) {
                        data.ejercicioId = data.ejercicio.id;

                        await rutina.update(data);
                        res.json({ status: '1', msg: 'Rutina actualizada.' });

                    }
                    else {
                        res.status(400).json({ status: '0', msg: 'Falta el ejercicio asociado.' }); 
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