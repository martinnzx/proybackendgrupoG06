const axios = require('axios');

const nutricionCtrl = {};

nutricionCtrl.buscarAlimento = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ status: '0', msg: 'Debe ingresar un término de búsqueda.' });
        }

        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=12`;
        
        const response = await axios.get(url, {
            timeout: 8000,
            headers: {
                'User-Agent': 'GymHub - proybackendgrupoG06 - Proyecto Universitario'
            }
        });

        if (!response.data || !response.data.products || response.data.products.length === 0) {
            return res.status(200).json({ status: '1', data: [] }); 
        }

        const alimentosLimpios = response.data.products
            .filter(p => p.nutriments && p.nutriments['energy-kcal_100g'])
            .map(p => ({
                id: p._id,
                nombre: p.product_name_es || p.product_name || 'Alimento desconocido',
                marca: p.brands || 'Sin marca',
                imagen: p.image_front_url || 'https://via.placeholder.com/150?text=Sin+Imagen',
                nutrientes: {
                    calorias: p.nutriments['energy-kcal_100g'] || 0,
                    proteinas: p.nutriments['proteins_100g'] || 0,
                    grasas: p.nutriments['fat_100g'] || 0,
                    carbohidratos: p.nutriments['carbohydrates_100g'] || 0
                }
            }));

        res.status(200).json({ status: '1', data: alimentosLimpios });

    } catch (error) {
        console.error('Error buscando nutricion:', error.message);
        
        if (error.response && error.response.status === 503) {
            return res.status(503).json({ status: '0', msg: 'El servidor de alimentos está temporalmente saturado. Por favor, intentá de nuevo.' });
        }
        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({ status: '0', msg: 'La búsqueda tardó demasiado. El servidor externo no responde.' });
        }

        res.status(500).json({ status: '0', msg: 'Error procesando la búsqueda de alimentos.' });
    }
};

module.exports = nutricionCtrl;
