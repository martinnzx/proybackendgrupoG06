const Pago = require('./../../src/models/pago.model'); // Asegúrate de usar la ruta 
const Tarifa = require('./../../src/models/tarifa.model'); // Asegúrate de usar la ruta 

const pagoCtrl = {}; 

// Crear una nuevo pago 
pagoCtrl.createPago = async (req, res) => { 
    /* 
        #swagger.tags = ['Pagos'] 
        #swagger.summary = 'Agregar un pago' 
        #swagger.description = 'Agrega una pago a una tarifa.' 
        #swagger.consumes = ['application/json'] 
        #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'Datos del pago a agregar.', 
            required: true, 
            schema: { $ref: '#/definitions/Pago' }  
        } 
        #swagger.responses[200] = { 
            description: 'Pago agregado correctamente.', 
            schema: { $ref: '#/definitions/Pago' } 
        } 
    */    

  try { 
    const data = req.body;
    if (data.tarifa  && data.tarifa.id) {
        data.tarifaId = data.tarifa.id;

        await Pago.create(req.body); 
        res.json({ status: '1', msg: 'Pago guardado.' }); 

    }
    else {
        res.status(400).json({ status: '0', msg: 'Falta tarifa asociada.' }); 
    }

  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 



// Obtener todos los pagos
pagoCtrl.getPagos = async (req, res) => { 
    /* 
        #swagger.tags = ['Pagos'] 
        #swagger.summary = 'Obtener todos pagos a tarifas' 
        #swagger.description = 'Retorna una lista de todos los pagos.' 
        #swagger.responses[200] = { 
            description: 'Lista de pagos obtenida con éxito.', 
            schema: { $ref: '#/definitions/Pagos' } 
        } 
    */

  try { 
    const pagos = await Pago.findAll(
            {include: [
           {model: Tarifa, as: 'tarifa', attributes: ['anio','mes' , 'precio', 'activo']}
        ]}

    ); 
    res.json(pagos); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener los pagos.' }); 
  } 
}; 
 
module.exports = pagoCtrl; 