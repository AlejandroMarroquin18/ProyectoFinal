/**
 * @file recommendationRoutes.js
 * @description Definición de la ruta para generar recomendaciones personalizadas de PCs utilizando Gemini.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ../controllers/geminiController Controladores para manejar las recomendaciones de PCs.
 */

const express = require('express');
const recommendationController = require('../controllers/recommendationController')

const router = express.Router();

/**
 * POST /recommend-pc
 * @description Ruta para generar una recomendación personalizada de PCs.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {number} req.body.maxBudget - Presupuesto máximo del usuario en USD.
 * @param {string} req.body.category - Categoría deseada (por ejemplo, "gaming", "oficina").
 * @param {string} [req.body.preferredBrand] - Marca preferida del usuario (opcional).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con la recomendación generada.
 */
router.post('/recommend-pc', recommendationController.recommendPC);

module.exports = router;