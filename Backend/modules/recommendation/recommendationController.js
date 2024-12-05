/**
 * @file recommendationController.js
 * @description Controlador para generar recomendaciones personalizadas de PCs utilizando el servicio de recomendación basado en Gemini.
 * @requires ./recommendationService Servicio para interactuar con el LLM Gemini.
 */

const { generateRecommendation } = require('./recommendationService');

/**
 * Controlador para generar una recomendación personalizada de PCs.
 * @function recommendPC
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {number} req.body.maxBudget - Presupuesto máximo del usuario en USD.
 * @param {string} req.body.category - Categoría deseada (por ejemplo, "gaming", "oficina").
 * @param {string} req.body.preferredBrand - Marca preferida del usuario (opcional).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con la recomendación generada.
 */
const recommendPC = async(req, res) => {
    console.log("RECOMMEND PC")
    const { maxBudget, category, preferredBrand } = req.body;

    if (!maxBudget || !category) {
        return res.status(400).json({
            message: 'Por favor, envía un presupuesto máximo y una categoría válidos.',
        });
    }

    try {
        const responseMessage = await generateRecommendation(maxBudget, category, preferredBrand);
        return res.json({ message: responseMessage });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

module.exports = { recommendPC };