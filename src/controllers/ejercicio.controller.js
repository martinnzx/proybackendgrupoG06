const Ejercicio = require('./../../src/models/ejercicio.model');
const Rutina = require('./../../src/models/rutina.model');

const ejercicioCtrl = {}; 

ejercicioCtrl.createEjercicio = async (req, res) => { 
  try { 
    await Ejercicio.create(req.body); 
    res.json({ status: '1', msg: 'Ejercicio guardado.' }); 
  } catch (error) { 
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' }); 
  } 
}; 

ejercicioCtrl.getEjercicios = async (req, res) => { 

  try { 
    const ejercicios = await Ejercicio.findAll(); 
    res.json(ejercicios); 
  } catch (error) { 
    res.status(500).json({ status: '0', msg: 'Error al obtener los ejercicios.' }); 
  } 
}; 
 
ejercicioCtrl.deleteEjercicio = async (req, res) => { 

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

ejercicioCtrl.editEjercicio = async (req, res) => { 

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