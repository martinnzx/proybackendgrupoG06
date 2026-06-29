const Suscripcion = require('./../../src/models/suscripcion.model'); // Asegúrate de usar la ruta 
const Usuario = require('./../../src/models/usuario.model');

const suscripcionCtrl = {}; 

// Crear una nueva suscripcion 
suscripcionCtrl.createSuscripcion = async (req, res) => { 
    /* 
        #swagger.tags = ['Suscripciones'] 
        #swagger.summary = 'Agregar una suscripcion' 
        #swagger.description = 'Agrega una suscripcion a lista de suscripciones.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos de la suscripcion a agregar.', 
            required: true, 
            schema: { $ref: '#/definitions/Suscripcion' }  
        } 
        #swagger.responses[200] = { 
            description: 'Suscripcion agregada correctamente.', 
            schema: { $ref: '#/definitions/Suscripcion' } 
        } 
    */    

  try { 
    const data = req.body;

    if (data.usuario  && data.usuario.id) {
        data.usuarioId = data.usuario.id;

        await Suscripcion.create(req.body); 
        res.json({ status: '1', msg: 'Suscripcion guardada.' }); 

    }
    else {
        res.status(400).json({ status: '0', msg: 'Falta el usuario asociado.' }); 
    }


  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 


// Obtener todos las rutinas
suscripcionCtrl.getSuscripciones = async (req, res) => { 
    /* 
        #swagger.tags = ['Suscripciones'] 
        #swagger.summary = 'Obtener todos las suscripciones' 
        #swagger.description = 'Retorna una lista de todos las suscripciones.' 
        #swagger.responses[200] = { 
            description: 'Lista de suscripciones obtenida con éxito.', 
            schema: { $ref: '#/definitions/Suscripcion' } 
        } 
    */

  try { 
    const suscripciones = await Suscripcion.findAll(
      {include: [
           {model: Usuario, as: 'usuario', attributes: ['id','apellido' ,'nombre', 'email']}
        ]}
    ); 
    res.json(suscripciones); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener las suscripciones.' }); 
  } 
}; 
 
module.exports = suscripcionCtrl; 