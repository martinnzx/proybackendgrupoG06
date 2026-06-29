const Tarifa = require('./../../src/models/tarifa.model'); // Asegúrate de usar la ruta 
const Suscripcion = require('./../../src/models/suscripcion.model'); // Asegúrate de usar la ruta 

const tarifaCtrl = {}; 

// Crear una nueva tarifa 
tarifaCtrl.createTarifa = async (req, res) => { 
    /* 
        #swagger.tags = ['Tarifas'] 
        #swagger.summary = 'Agregar una tarifa' 
        #swagger.description = 'Agrega una tarifa a lista de tarifas.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos de la tarifa a agregar.', 
            required: true, 
            schema: { $ref: '#/definitions/Tarifa' }  
        } 
        #swagger.responses[200] = { 
            description: 'Tarifa agregada correctamente.', 
            schema: { $ref: '#/definitions/Tarifa' } 
        } 
    */    

  try { 
    const data = req.body;

    if (data.suscripcion  && data.suscripcion.id) {
        data.suscripcionId = data.suscripcion.id;

        await Tarifa.create(req.body); 
        res.json({ status: '1', msg: 'Tarifa guardada.' }); 

    }
    else {
        res.status(400).json({ status: '0', msg: 'Falta suscripcion asociada.' }); 
    }


  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 


// Obtener todos las tarifas
tarifaCtrl.getTarifas = async (req, res) => { 
    /* 
        #swagger.tags = ['Tarifas'] 
        #swagger.summary = 'Obtener todos las tarifas' 
        #swagger.description = 'Retorna una lista de todos las tarifas.' 
        #swagger.responses[200] = { 
            description: 'Lista de tarifas obtenida con éxito.', 
            schema: { $ref: '#/definitions/Tarifa' } 
        } 
    */

  try { 
    const tarifas = await Tarifa.findAll(
      {include: [
           {model: Suscripcion, as: 'suscripcion', attributes: ['id','fecha_inicio' ,'fecha_fin', 'precio', 'activo']}
        ]}
    ); 
    res.json(tarifas); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener las tarifas.' }); 
  } 
}; 
 
module.exports = tarifaCtrl; 