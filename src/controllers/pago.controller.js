const Pago = require('./../../src/models/pago.model'); // Asegúrate de usar la ruta 
const Tarifa = require('./../../src/models/tarifa.model'); // Asegúrate de usar la ruta 

const pagoCtrl = {}; 

pagoCtrl.createPago = async (req, res) => { 

  try { 
    const data = req.body;
    const tarifaId = data.tarifa?.id || data.tarifaId;

    if (!tarifaId) {
        return res.status(400).json({ status: '0', msg: 'Falta tarifa asociada.' });
    }

    const tarifa = await Tarifa.findByPk(tarifaId);

    if (!tarifa) {
        return res.status(404).json({ status: '0', msg: 'Tarifa asociada no encontrada.' });
    }

    if (tarifa.activo === false) {
        return res.status(400).json({ status: '0', msg: 'No se puede crear un pago para una tarifa anulada.' });
    }

    if (tarifa.pagado === true) {
        return res.status(400).json({ status: '0', msg: 'No se puede crear un pago para una tarifa ya pagada.' });
    }

    data.tarifaId = tarifaId;

    await Pago.create(data); 
    await Tarifa.update({ pagado: true }, { where: { id: tarifaId } });
    res.json({ status: '1', msg: 'Pago guardado.' }); 

  } catch (error) { 
    console.error(error);
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 

pagoCtrl.getPagos = async (req, res) => { 
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
 
pagoCtrl.anularPago = async (pagoId) => { 
  if (!pagoId) {
    const error = new Error('Falta el id del pago.');
    error.statusCode = 400;
    throw error;
  }

  const pago = await Pago.findByPk(pagoId);

  if (!pago) {
    const error = new Error('Pago no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const tarifaId = pago.tarifaId || pago.dataValues.tarifaId || pago.getDataValue('tarifaId');

  if (!tarifaId) {
    const error = new Error('El pago no tiene una tarifa asociada.');
    error.statusCode = 400;
    throw error;
  }

  const tarifa = await Tarifa.findByPk(tarifaId);

  if (!tarifa) {
    const error = new Error('Tarifa asociada no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (tarifa.activo === false) {
    const error = new Error('No se puede anular un pago de una tarifa anulada.');
    error.statusCode = 400;
    throw error;
  }

  if (tarifa.pagado === false) {
    const error = new Error('La tarifa asociada ya no se encuentra pagada.');
    error.statusCode = 400;
    throw error;
  }

  await Pago.update(
    { activo: false },
    { where: { id: pagoId } }
  );

  await Tarifa.update(
    { pagado: false },
    { where: { id: tarifaId } }
  );

  return { status: '1', msg: 'Pago anulado correctamente.' };
}; 

module.exports = pagoCtrl; 