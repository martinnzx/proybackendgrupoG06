const Suscripcion = require('./../../src/models/suscripcion.model'); // Asegúrate de usar la ruta 
const Usuario = require('./../../src/models/usuario.model');
const Tarifa = require('./../../src/models/tarifa.model');

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


// Obtener todos las suscripciones
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
 
// Eliminar una suscripcion
suscripcionCtrl.deleteSuscricion = async (req, res) => { 

    /* 
        #swagger.tags = ['Suscripciones'] 
        #swagger.summary = 'Eliminar una suscripcion' 
        #swagger.description = 'Elimina una suscripcion de la lista de suscripciones.' 
        #swagger.parameters['id'] = { 
            in: 'path', 
            description: 'ID de la suscripcion a eliminar.', 
            required: true, 
            type: 'string' 
        } 
        #swagger.responses[200] = { 
            description: 'Suscripcion eliminada correctamente.'
        } 
    */

  try { 
    const suscripcion = await Suscripcion.findByPk(req.params.id);

    if (!suscripcion) {
      return res.status(404).json({ status: '0', msg: 'Suscripcion no encontrada.' });
    }

    const tarifasAsociadas = await Tarifa.findOne({
      where: { suscripcionId: req.params.id }
    });

    if (tarifasAsociadas) {
      return res.status(400).json({ status: '0', msg: 'No se puede eliminar la suscripción porque tiene tarifas asociadas.' });
    }

    await suscripcion.destroy();
    res.json({ status: '1', msg: 'Suscripcion eliminada' }); 
  } catch (error) { 
    console.error(error);
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' }); 
  } 
}; 

// Editar una suscripcion 
suscripcionCtrl.editSuscripcion = async (req, res) => { 

/* 
        #swagger.tags = ['Suscripciones'] 
        #swagger.summary = 'Modificar una suscripcion' 
        #swagger.description = 'Modifica los datos de una suscripcion existente.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos de la suscripcion a modificar.', 
            required: true, 
            schema: { $ref: '#/definitions/Suscripcion' }  
        } 
        #swagger.responses[200] = { 
            description: 'Suscripcion modificada correctamente.', 
            schema: { $ref: '#/definitions/Suscripcion' } 
        } 
    */    

    const data = req.body;
    try {
        const suscripcion = await Suscripcion.findByPk(req.params.id);

        if (suscripcion) {
            if (data.usuario && data.usuario.id) {
                data.usuarioId = data.usuario.id;

                  await suscripcion.update(data);
                  res.json({ status: '1', msg: 'Suscripcion actualizada.' });

            }
            else {
                res.status(400).json({ status: '0', msg: 'Falta el usuario asociado.' }); 
            }
        } else {
            res.status(404).json({ error: 'Suscripcion no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la suscripcion:', error);
        res.status(500).json({ error: 'Error al actualizar la suscripcion' });
    }
};

module.exports = suscripcionCtrl; 