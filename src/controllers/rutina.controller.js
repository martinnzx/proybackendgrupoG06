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
        #swagger.description = 'Retorna una lista de rutinas.' 
        #swagger.responses[200] = { 
            description: 'Lista de rutinas obtenida con éxito.', 
            schema: { $ref: '#/definitions/Rutinas' } 
        } 
    */

  try { 
    const rutinas = await Rutina.findAll(
            {include: [
           {model: Ejercicio, as: 'ejercicio', attributes: ['nombre','descripcion' , 'youtube_url', 'activo']},
           {model: Usuario, as: 'usuario', attributes: ['nombre','apellido' , 'email']}
        ]}

    ); 
    res.json(rutinas); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener las rutinas.' }); 
  } 
}; 
 
module.exports = rutinaCtrl; 