const axios = require('axios');

const youtubeCtrl = {};

// Buscar videos de un ejercicio en YouTube
youtubeCtrl.buscarVideos = async (req, res) => {
    /*
        #swagger.tags = ['YouTube']
        #swagger.summary = 'Buscar videos de un ejercicio'
        #swagger.description = 'Busca en YouTube videos explicando cómo hacer un ejercicio.'
        #swagger.parameters['q'] = {
            in: 'query',
            description: 'Nombre del ejercicio a buscar.',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Lista de videos encontrados.'
        }
    */

    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ status: '0', msg: 'Debe indicar un ejercicio a buscar.' });
    }

    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: `${q} ejercicio como hacer`,
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
