//const Suscripcion = require('./src/models/suscripcion.model');

const swaggerAutogen = require('swagger-autogen')(); 
 
const doc = { 
  info: { 
    title: 'APIs TRABAJO FINAL', 
    description: 'Trabajo Final Programacion y Servicios Web - 2026' 
  }, 
  host: 'localhost:3000', // Reemplaza con la dirección de tu servidor 
  basePath: "/", 
  schemes: ['http', 'https'], 
  tags: [ 
    { 
      name: 'Ejercicios', 
      description: 'Operaciones relacionadas con ejercicios.' 
    }, 
    { 
      name: 'Rutinas', 
      description: 'Operaciones relacionadas con rutinas de ejercicios.' 
    } ,
    { 
      name: 'Suscripciones', 
      description: 'Operaciones relacionadas con suscripciones.' 
    } ,
    { 
      name: 'Tarifas', 
      description: 'Operaciones relacionadas con tarifas de suscripciones.' 
    } ,
    { 
      name: 'Pagos', 
      description: 'Operaciones relacionadas con pagos a tarifas.' 
    } 


  ], 
  definitions: { 
    Ejercicio: { 
      nombre: 'Bicicleta fija', 
      descripcion: 'calentamiento general', 
      youtube_url: 'link a página(mostrar ejercicio)',
      activo: true

    }, 
    Suscripcion: { 
      fecha_inicio: '2026-06-01', 
      fecha_fin: '2026-12-31', 
      precio: '50.000',
      activo: true/*,
         usuario: { 
            id: 1, 
            nombre: 'Juan', 
            apellido: 'Perez', 
            email: 'correo_usuario@gmail.com'
         } */

    } ,
    Tarifa: { 
      anio: '2026', 
      mes: '6', 
      precio: '50.000',
      pagado: false,
      activo: true,
         suscripcion: { 
            id: 1, 
            fecha_inicio: '2026-06-01', 
            fecha_fin: '2026-12-31', 
            precio: '50.000',
            activo: true
         } 

    } ,
    Pago: { 
      fecha: '2026-06-28', 
      transaccion: 'tipo de pago? comprobante? medio de pago?', 
      monto: '50.000',
      activo: true,
         tarifa: { 
            id: 1, 
            anio: '2026', 
            mes: '6', 
            precio: '50.000',
            pagado: false,
            activo: true
         } 

    },

    Rutina: { 
      dia_semana: 'Lunes', 
      turno: 'tarde', 
      nombre: 'nombre rutina',
      descripcion: 'descripcion rutina',
      activo: true,
        ejercicio: { 
          id: 1, 
          nombre: 'Bicicleta fija', 
          descripcion: 'calentamiento general', 
          youtube_url: 'link a página(mostrar ejercicio)',
          activo: true
        }
/*        , 
        usuario: { 
          id: 1, 
          nombre: 'Juan', 
          apellido: 'Perez', 
          email: 'correo_usuario@gmail.com',
          activo: true
        } */
     }

  } 
}; 
 
const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./index.js']; // verifica la ruta 
 
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => { 
    console.log(`Documentación generada en ${outputFile}`); 
    //require('./index.js'); // verifica la ruta donde inicia tu app 
});