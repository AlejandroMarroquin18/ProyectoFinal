/**
 * @file listController.js
 * @description Controladores para manejar operaciones CRUD en listas utilizando los servicios correspondientes.
 * @requires ../services/listService Servicios relacionados con la gestión de listas en Firebase Realtime Database.
 */

const { createList, addItemToList, deleteList, getList, removeItemFromList } = require('../services/listService')

/**
 * Controlador para crear una nueva lista.
 * @function createListController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista a crear.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const createListController = async (req, res) => {
  const { listName } = req.body; 

  if (!listName || typeof listName !== 'string') {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser valido'});
  }

  try {
    const result = await createList(listName);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en createList')
    res.status(500).json({ error: error.message }); 
  }
} 


/**
 * Controlador para añadir un ítem a una lista existente.
 * @function addItemToListController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista a la que se agregará el ítem.
 * @param {string|Object} req.body.item - Ítem a agregar a la lista.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const addItemToListController = async (req, res) => {
  const { listName, item } = req.body;

  if (!listName || !item ) {
    return res.status(400).json({ error: 'Los datos son incorrectos. Se requiere un listName válido y un item.' });
  }

  try {
    const result = await addItemToList(listName, item);
    return res.status(200).json(result);  
  } catch (error) {
    console.error('Error en addItemController:', error);
    return res.status(500).json({ error: error.message }); 
  }
}


/**
 * Controlador para eliminar un ítem de una lista.
 * @function removeItemFromListController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista que contiene el ítem.
 * @param {string|Object} req.body.item - Ítem a eliminar de la lista.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const removeItemFromListController = async (req, res) => {
  console.log('Llamada a addItemController');
  const { listName, item } = req.body;

  try {
    if (!item) {
      return res.status(400).json({ error: 'El valor del ítem es necesario' });
    }
    
    const message = await removeItemFromList(listName, item);
    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error en el controlador removeItemFromList:", error);
    return res.status(500).json({ error: error.message });
  }
}


/**
 * Controlador para eliminar una lista completa.
 * @function deleteListController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.listName - Nombre de la lista a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const deleteListController = async (req, res) => {
  const { listName } = req.body;

  try {
    const message = await deleteList(listName);
    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error en el controlador removeList:", error);
    return res.status(500).json({ error: error.message });
  }
}


/**
 * Controlador para obtener la información de una lista por su nombre.
 * @function getListController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros de consulta enviados en la solicitud.
 * @param {string} req.query.listName - Nombre de la lista a buscar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con la información de la lista.
 */
const getListController = async (req, res) => {
  const { listName } = req.query;
  
  try {
    const list = await getList(listName);
    return res.status(200).json(list);
  } catch (error) {
    console.error("Error en el controlador getList:", error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { createListController, addItemToListController, removeItemFromListController, deleteListController, getListController }