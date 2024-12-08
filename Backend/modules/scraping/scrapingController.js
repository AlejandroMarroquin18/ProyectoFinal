/**
 * @file scrapingController.js
 * @description Controlador para manejar las peticiones relacionadas con el scraping de productos y filtros.
 * @requires ./scrapingService Servicio que contiene las funciones de scraping.
 */

const { scrapeProducts, scrapeFilters } = require('./scrapingService')

/**
 * Controlador para obtener los productos desde varias fuentes.
 * @function getProducts
 * @param {Object} req - Objeto de la solicitud (request).
 * @param {Object} res - Objeto de la respuesta (response).
 * @returns {Promise<void>} Responde con los productos obtenidos o un mensaje de error.
 */
const getProductsController = async (req, res) => {
  const { nameSearch, amount } = req.query; 
  
  if (!nameSearch || !amount) {
    return res.status(400).json({ error: 'Faltan parámetros: nameSearch y amount son obligatorios.' });
  }

  try {
    const products = await scrapeProducts(nameSearch, parseInt(amount));
    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({ error: 'Ocurrió un error al realizar el scraping de productos.' });
  }
};

/**
 * Controlador para obtener los filtros disponibles para un producto.
 * @function getFilters
 * @param {Object} req - Objeto de la solicitud (request).
 * @param {Object} res - Objeto de la respuesta (response).
 * @returns {Promise<void>} Responde con los filtros obtenidos o un mensaje de error.
 */
const getFiltersController = async (req, res) => {
  const { nameSearch } = req.query; 

  if (!nameSearch) {
    return res.status(400).json({ error: 'Falta el parámetro: nameSearch es obligatorio.' });
  }

  try {
    const filters = await scrapeFilters(nameSearch);
    return res.status(200).json({ filters });
  } catch (error) {
    console.error('Error al obtener filtros:', error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los filtros.' });
  }
};

module.exports = { getProductsController, getFiltersController }