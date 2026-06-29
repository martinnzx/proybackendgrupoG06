const Ejercicio = require('./../../src/models/ejercicio.model'); // Asegúrate de usar la ruta 

const ejercicioCtrl = {}; 

// Crear un nuevo ejercicio 
ejercicioCtrl.createEjercicio = async (req, res) => { 
    /* 
        #swagger.tags = ['Ejercicios'] 
        #swagger.summary = 'Agregar un ejercicio' 
        #swagger.description = 'Agrega un ejercicio a lista de ejercicios.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos del ejercicio a agregar.', 
            required: true, 
            schema: { $ref: '#/definitions/Ejercicio' }  
        } 
        #swagger.responses[200] = { 
            description: 'Ejercicio agregado correctamente.', 
            schema: { $ref: '#/definitions/Ejercicio' } 
        } 
    */    

  try { 
    // Sequelize usa .create() para instanciar y guardar en un solo paso 
    await Ejercicio.create(req.body); 
    res.json({ status: '1', msg: 'Ejercicio guardado.' }); 
  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 



// Obtener todos los ejercicios 
ejercicioCtrl.getEjercicios = async (req, res) => { 
    /* 
        #swagger.tags = ['Ejercicios'] 
        #swagger.summary = 'Obtener todos los ejercicios' 
        #swagger.description = 'Retorna una lista de todos los ejercicios.' 
        #swagger.responses[200] = { 
            description: 'Lista de ejercicios obtenida con éxito.', 
            schema: { $ref: '#/definitions/Ejercicio' } 
        } 
    */

  try { 
    const ejercicios = await Ejercicio.findAll(); 
    res.json(ejercicios); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener los ejercicios.' }); 
  } 
}; 
 
module.exports = ejercicioCtrl; 