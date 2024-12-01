const { generateRecommendation } = require('../services/geminiService');

async function recommendPC(req, res) {
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