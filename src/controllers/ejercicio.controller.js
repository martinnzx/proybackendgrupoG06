const Ejercicio = require('./../../src/models/ejercicio.model'); // Asegúrate de usar la ruta 
const Rutina = require('./../../src/models/rutina.model');

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
 
// Eliminar un ejercicio 
ejercicioCtrl.deleteEjercicio = async (req, res) => { 

    /* 
        #swagger.tags = ['Ejercicios'] 
        #swagger.summary = 'Eliminar un ejercicio' 
        #swagger.description = 'Elimina un ejercicio de la lista de ejercicios.' 
        #swagger.parameters['id'] = { 
            in: 'path', 
            description: 'ID del ejercicio a eliminar.', 
            required: true, 
            type: 'string' 
        } 
        #swagger.responses[200] = { 
            description: 'Ejercicio eliminado correctamente.'
        } 
    */
  try { 
    const ejercicio = await Ejercicio.findByPk(req.params.id);

    if (!ejercicio) {
      return res.status(404).json({ status: '0', msg: 'Ejercicio no encontrado.' });
    }

    const rutinasAsociadas = await Rutina.findOne({
      where: { ejercicioId: req.params.id }
    });

    if (rutinasAsociadas) {
      return res.status(400).json({ status: '0', msg: 'No se puede eliminar el ejercicio porque tiene rutinas asociadas.' });
    }

    await ejercicio.destroy();
    res.json({ status: '1', msg: 'Ejercicio eliminado' }); 
  } catch (error) { 
    console.error(error);
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' }); 
  } 
}; 

// Editar un ejercicio 
ejercicioCtrl.editEjercicio = async (req, res) => { 

    /* 
        #swagger.tags = ['Ejercicios'] 
        #swagger.summary = 'Modificar un ejercicio' 
        #swagger.description = 'Modifica los datos de un ejercicio existente.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos del ejercicio a modificar.', 
            required: true, 
            schema: { $ref: '#/definitions/Ejercicio' }  
        } 
        #swagger.responses[200] = { 
            description: 'Ejercicio modificado correctamente.', 
            schema: { $ref: '#/definitions/Ejercicio' } 
        } 
    */    

  try { 
        const ejercicio = await Ejercicio.findByPk(req.params.id);

        if (ejercicio) {
            await ejercicio.update(req.body);
            res.json({ status: '1', msg: 'Ejercicio actualizado' });
        } else {
            res.status(404).json({ status: '0', msg: 'Ejercicio no encontrado' });
        }
  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' }); 
  } 

}; 


module.exports = ejercicioCtrl; 