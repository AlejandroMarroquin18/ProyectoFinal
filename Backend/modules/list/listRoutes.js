/**
 * @file listRoutes.js
 * @description Definición de las rutas para manejar operaciones CRUD en listas y sus ítems.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ./listController Controladores para manejar las operaciones de listas.
 */

const express = require('express');
const listController = require('./listController');

const router = express.Router();

/**
 * POST /create-list
 * @description Ruta para crear una nueva lista.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista a crear.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
router.post('/create-list', listController.createListController);

/**
 * POST /add-item
 * @description Ruta para agregar un ítem a una lista existente.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista.
 * @param {string|Object} req.body.item - Ítem a agregar a la lista.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
router.post('/add-item', listController.addItemToListController);

/**
 * DELETE /remove-item
 * @description Ruta para eliminar un ítem de una lista.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista.
 * @param {string|Object} req.body.item - Ítem a eliminar de la lista.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
router.delete('/remove-item', listController.removeItemFromListController);

/**
 * DELETE /delete-list
 * @description Ruta para eliminar una lista completa.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
router.delete('/delete-list', listController.deleteListController);

/**
 * GET /get-list
 * @description Ruta para obtener la información de una lista por su nombre.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros de consulta enviados en la solicitud.
 * @param {string} req.query.listName - Nombre de la lista a buscar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con la información de la lista.
 */
router.get('/get-list', listController.getListController)

module.exports = router;