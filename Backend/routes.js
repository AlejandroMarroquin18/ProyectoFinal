const express = require('express');
const { generateRecommendation } = require('./services/geminiService');

const router = express.Router();

// Ruta principal para recomendaciones
router.post('/recommend-pc', async (req, res) => {
    const { maxBudget, category, preferredBrand } = req.body;

    // Validar los parámetros de entrada
    if (!maxBudget || !category) {
        return res.status(400).json({
            message: 'Por favor, envía un presupuesto máximo y una categoría válidos.',
        });
    }

    try {
        const responseMessage = await generateRecommendation(maxBudget, category, preferredBrand);
        res.json({ message: responseMessage });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

module.exports = router;