const Suscripcion = require('./../../src/models/suscripcion.model'); // Asegúrate de usar la ruta 
const Usuario = require('./../../src/models/usuario.model');
const Tarifa = require('./../../src/models/tarifa.model');

const suscripcionCtrl = {}; 

suscripcionCtrl.createSuscripcion = async (req, res) => { 
  try { 
    const data = req.body;

    if (data.usuario  && data.usuario.id) {
        data.usuarioId = data.usuario.id;

        const nuevaSuscripcion = await Suscripcion.create(req.body); 

        let anioStr = '';
        let mesStr = '';
        
        if (req.body.fecha_inicio && req.body.fecha_inicio.includes('-')) {
            const partes = req.body.fecha_inicio.split('-');
            anioStr = partes[0];
            mesStr = parseInt(partes[1], 10).toString();
        } else {
            const fechaD = new Date(req.body.fecha_inicio);
            anioStr = fechaD.getFullYear().toString();
            mesStr = (fechaD.getMonth() + 1).toString();
        }

        await Tarifa.create({
            anio: anioStr,
            mes: mesStr,
            precio: req.body.precio,
            pagado: false,
            activo: true,
            suscripcionId: nuevaSuscripcion.id
        });

        res.json({ status: '1', msg: 'Suscripcion y Cuota inicial guardadas exitosamente.' }); 

    }
    else {
        res.status(400).json({ status: '0', msg: 'Falta el usuario asociado.' }); 
    }


  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 

suscripcionCtrl.getSuscripciones = async (req, res) => { 

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
 
suscripcionCtrl.deleteSuscricion = async (req, res) => { 
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

suscripcionCtrl.editSuscripcion = async (req, res) => { 
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