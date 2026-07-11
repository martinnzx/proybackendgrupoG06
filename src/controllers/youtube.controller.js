const axios = require('axios');

const youtubeCtrl = {};

const EJERCICIOS_VALIDOS = [
    'press banca', 'press plano', 'press inclinado', 'press declinado', 'press con mancuernas',
    'aperturas', 'flexiones', 'lagartijas', 'push up', 'pullover', 'fondos en paralelas', 'fondos',

    'dominadas', 'pull up', 'chin up', 'jalon al pecho', 'jalon dorsal', 'jalon tras nuca',
    'remo', 'remo con barra', 'remo con mancuerna', 'remo en polea', 'remo t', 'remo invertido',
    'peso muerto', 'peso muerto rumano', 'peso muerto sumo', 'peso muerto piernas rigidas',
    'hiperextensiones', 'buenos dias', 'pull over',

    'press militar', 'press de hombro', 'press arnold', 'elevaciones laterales',
    'elevaciones frontales', 'pajaros', 'face pull', 'encogimientos', 'shrugs', 'remo al menton',

    'curl biceps', 'curl de biceps', 'curl martillo', 'curl predicador', 'curl concentrado',
    'curl 21', 'extension triceps', 'press frances', 'jalon triceps', 'patada de triceps',
    'fondos de triceps', 'flexiones de biceps',

    'sentadilla', 'sentadilla bulgara', 'sentadilla sumo', 'sentadilla hack', 'sentadilla pistol',
    'sentadilla goblet', 'zancadas', 'estocadas', 'hip thrust', 'puente de gluteos', 'prensa de piernas',
    'extension de cuadriceps', 'curl femoral', 'aductores', 'abductores', 'gemelos', 'pantorrillas',
    'elevacion de talones', 'peso muerto a una pierna', 'step up', 'patada de gluteo',

    'abdominales', 'crunch', 'plancha', 'plancha lateral', 'elevacion de piernas', 'rueda abdominal',
    'russian twist', 'giro ruso', 'hollow body', 'superman', 'mountain climber', 'puente', 'bicicleta abdominal',
    'v ups', 'dragon flag',

    'muscle up', 'muscle-up', 'front lever', 'back lever', 'human flag', 'parada de manos',
    'handstand', 'handstand push up', 'flexiones a una mano', 'dominadas australianas',
    'australian pull up', 'plancha con brazos', 'l sit', 'pistol squat', 'burpees',

    'lenador', 'wood chopper', 'kettlebell swing', 'swing con pesa rusa', 'box jump', 'wall ball',
    'thruster', 'clean', 'clean and jerk', 'arrancada', 'snatch', 'battle rope', 'sled push',
    'farmer walk', 'turkish get up', 'sentadilla con salto', 'jumping jack', 'saltos', 'sogas',

    'mancuernas', 'barra', 'kettlebell', 'pesa rusa', 'maquina de gimnasio', 'polea', 'trx',
    'banda elastica', 'peso corporal',

    'cardio', 'cinta', 'bicicleta fija', 'eliptica', 'saltar la soga', 'trote', 'correr',
    'estiramiento', 'movilidad', 'calentamiento', 'elongacion'
];

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/-/g, ' ')
        .trim();
}

const CONECTORES = ['de', 'del', 'la', 'el', 'los', 'las', 'en', 'un', 'una', 'y', 'con', 'para', 'a'];

function esEjercicioValido(query) {
    const q = normalizar(query);

    if (EJERCICIOS_VALIDOS.some(ejercicio => q.includes(ejercicio) || ejercicio.includes(q))) {
        return true;
    }

    const palabras = q.split(' ').filter(palabra => palabra.length > 3 && !CONECTORES.includes(palabra));
    return palabras.some(palabra => EJERCICIOS_VALIDOS.some(ejercicio => ejercicio.includes(palabra)));
}

youtubeCtrl.buscarVideos = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ status: '0', msg: 'Debe indicar un ejercicio a buscar.' });
    }

    if (!esEjercicioValido(q)) {
        return res.status(400).json({ status: '0', msg: 'No encontramos ese ejercicio. Probá con el nombre de un ejercicio de gimnasio (ej: sentadilla, press banca, peso muerto, muscle up).' });
    }

    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: `${q} ejercicio gimnasio como hacer`,
                type: 'video',
                maxResults: 6,
                key: process.env.YOUTUBE_API_KEY
            }
        });

        const videos = response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle
        }));

        res.json(videos);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ status: '0', msg: 'Error al buscar videos en YouTube.' });
    }
};

module.exports = youtubeCtrl;
