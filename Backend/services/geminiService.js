const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Inicializar Gemini con la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function generateRecommendation(maxBudget, category, preferredBrand) {
    const prompt = `
    Toma el rol de un experto en computadores. Tu objetivo es ayudar a los usuarios a encontrar un PC adecuado según las siguientes especificaciones:
    
    - Presupuesto máximo: ${maxBudget} USD.
    - Categoría: ${category}.
    - Marca preferida: ${preferredBrand || 'Sin preferencia'}.

    Proporciona una recomendación específica basada en estas necesidades. Responde de manera clara y profesional de máximo 100 palabras. Si el usuario solicita algo que no esté relacionado con computadoras, responde: "No tengo respuesta a tu petición". Usa un lenguaje amigable.
    `;

    console.log('Prompt enviado:', prompt);

    try {
        const result = await model.generateContent(prompt);
        const candidates = result.response?.candidates;

        if (!candidates || candidates.length === 0) {
            console.error('No se encontraron candidatos:', candidates);
            throw new Error('No se encontraron candidatos en la respuesta del modelo.');
        }

        const responseMessage = candidates[0]?.content?.parts?.[0]?.text?.trim();
        return responseMessage || 'Respuesta no generada.';
    } catch (error) {
        console.error('Error al generar la respuesta:', error.message);
        throw new Error('Error al generar la respuesta. Intenta nuevamente más tarde.');
    }
}

module.exports = { generateRecommendation };