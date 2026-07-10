const Tarifa = require('./../../src/models/tarifa.model'); // Asegúrate de usar la ruta 
const Suscripcion = require('./../../src/models/suscripcion.model'); // Asegúrate de usar la ruta 
const Usuario = require('./../../src/models/usuario.model');

const tarifaCtrl = {}; 

tarifaCtrl.createTarifa = async (req, res) => { 
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

tarifaCtrl.getTarifas = async (req, res) => { 
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

 tarifaCtrl.getCuotasImpagasPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const cuotasImpagas = await Tarifa.findAll({
            include: [
                {
                    model: Suscripcion,
                    as: 'suscripcion',
                    attributes: ['id', 'fecha_inicio', 'fecha_fin', 'precio', 'activo'],
                    where: { usuarioId },
                    include: [
                        {
                            model: Usuario,
                            as: 'usuario',
                            attributes: ['id', 'apellido', 'nombre', 'email']
                        }
                    ]
                }
            ],
            where: { pagado: false, activo: true },
            order: [['anio', 'ASC'], ['mes', 'ASC']]
        });

        res.json(cuotasImpagas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener las cuotas impagas.' });
    }
};

tarifaCtrl.getMisTarifas = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const misTarifas = await Tarifa.findAll({
            include: [
                {
                    model: Suscripcion,
                    as: 'suscripcion',
                    attributes: ['id', 'fecha_inicio', 'fecha_fin', 'precio', 'activo'],
                    where: { usuarioId }
                }
            ],
            order: [['anio', 'DESC'], ['mes', 'DESC']]
        });

        res.json(misTarifas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener las cuotas del socio.' });
    }
};

tarifaCtrl.anularTarifa = async (req, res) => { 
  try { 
    const tarifa = await Tarifa.findByPk(req.params.id);

    if (!tarifa) {
      return res.status(404).json({ status: '0', msg: 'Tarifa no encontrada.' });
    }

    if (tarifa.activo === false) {
      return res.status(400).json({ status: '0', msg: 'La tarifa ya se encuentra anulada.' });
    }

    if (tarifa.pagado === true) {
      return res.status(400).json({ status: '0', msg: 'No se puede anular una tarifa pagada.' });
    }

    await tarifa.update({ activo: false });
    res.json({ status: '1', msg: 'Tarifa anulada correctamente.' }); 
  } catch (error) { 
    console.error(error);
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' }); 
  } 
}; 

module.exports = tarifaCtrl; 