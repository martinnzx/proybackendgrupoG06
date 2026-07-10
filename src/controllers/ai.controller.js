const axios = require('axios');

const aiCtrl = {};

aiCtrl.generarRutinaIA = async (req, res) => {
    try {
        const { nombre, ejercicios } = req.body;

        if (!nombre) {
            return res.status(400).json({ status: '0', msg: 'Falta nombre de la rutina.' });
        }

        const apiKey = process.env.GROQ_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ status: '0', msg: 'Falta la API Key de Groq en el servidor.' });
        }

        let listaEjercicios = "";
        if (ejercicios && ejercicios.length > 0) {
            listaEjercicios = `\nREGLA DE ORO: Solo tienes permitido utilizar los siguientes ejercicios para construir la rutina: ${ejercicios.join(', ')}. No agregues ningún otro ejercicio que no esté en esta lista.`;
        }

        const systemPrompt = `Eres un entrenador personal de élite. Escribe la rutina solicitada.${listaEjercicios}

Directrices estrictas:
- Redacta una ÚNICA sesión coherente, sin separar en días ni turnos.
- Especifica series, repeticiones y tiempo de descanso.
- Devuelve texto plano (NO uses markdown ni asteriscos).
- EXTREMADAMENTE IMPORTANTE: Tu respuesta TOTAL no puede superar bajo ninguna circunstancia los 250 caracteres de longitud. Sé increíblemente breve y conciso, usando abreviaturas si es necesario.`;

        const requestBody = {
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Rutina enfocada en: ${nombre}` }
            ]
        };

        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', requestBody, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        if (response.data?.choices?.length > 0) {
            let descripcionGenerada = response.data.choices[0].message.content;
            
            descripcionGenerada = descripcionGenerada.replace(/\*/g, '').trim();

            return res.status(200).json({ 
                status: '1', 
                msg: 'Rutina generada exitosamente.',
                textoGenerado: descripcionGenerada 
            });
        } else {
            return res.status(500).json({ 
                status: '0', 
                msg: 'La API de Groq no devolvió texto.' 
            });
        }

    } catch (error) {
        const status = error.response?.status || 500;
        let errorMessage = 'Error al conectarse a la IA de Groq.';

        if (status === 401) errorMessage = 'La API Key de Groq es inválida.';
        if (status === 429) errorMessage = 'Se alcanzó el límite de peticiones en Groq.';

        console.error('Error real IA (Groq):', error.response?.data?.error?.message || error.message);
        
        return res.status(status).json({ 
            status: '0', 
            msg: errorMessage 
        });
    }
};

module.exports = aiCtrl;
