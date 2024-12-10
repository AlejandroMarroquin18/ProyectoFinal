/**
 * @file scrapingRoutes.js
 * @description Definición de las rutas para manejar las operaciones de scraping en la aplicación.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ./scrapingController Controladores para manejar las operaciones de scraping.
 */

const express = require('express')
const scrapingController = require('./scrapingController')

const router = express.Router()

/**
 * GET /get-products
 * @description Ruta para obtener productos desde diferentes fuentes de e-commerce como MercadoLibre, Alkosto y Amazon.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros de consulta enviados en la solicitud.
 * @param {string} req.query.nameSearch - Nombre o palabra clave del producto a buscar.
 * @param {number} req.query.amount - Número de productos a obtener.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Lista de productos obtenidos de las fuentes de scraping.
 * @example GET /get-products?nameSearch=smartphone&amount=10
 */
router.get('/get-products', scrapingController.getProductsController);

/**
 * GET /get-filters
 * @description Ruta para obtener los filtros disponibles para un producto específico en MercadoLibre.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros de consulta enviados en la solicitud.
 * @param {string} req.query.nameSearch - Nombre o palabra clave del producto a buscar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Lista de filtros disponibles para el producto.
 * @example GET /get-filters?nameSearch=smartphone
 */
router.get('/get-filters', scrapingController.getFiltersController)

module.exports = router;