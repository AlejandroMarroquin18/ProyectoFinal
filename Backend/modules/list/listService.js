/**
 * @file listService.js
 * @description Servicio para manejar operaciones CRUD en listas de artículos utilizando Firebase Realtime Database.
 * @requires ../../config/firebaseConfig Configuración de Firebase.
 */

const { db } = require('../../config/firebaseConfig')

/**
 * Crea una nueva lista en la base de datos.
 * @function createList
 * @param {string} listName - Nombre de la lista a crear.
 * @returns {Promise<string>} Mensaje de éxito al crear la lista.
 */
const createList = async (listName) => {
  console.log("CREATE LIST")
  try {
    const listRef = db.ref('lists');
    const snapshot = await listRef.orderByChild('name').equalTo(listName).once('value');
    if (snapshot.exists()) {
      throw new Error('La lista ya existe');
    }

    const newListRef = listRef.push();
    await newListRef.set({
      name: listName,
      createdAt: new Date().toISOString(),
      items: [],
    });

    console.log(`Lista '${listName}' creada exitosamente`);
    return `Lista '${listName}' creada exitosamente`;
  } catch (error) {
    console.error("Error en la función createList:", error.message);
    throw error;
  }
}


/**
* Obtiene la información de una lista por su nombre.
* @function getList
* @param {string} listName - Nombre de la lista a buscar.
* @returns {Promise<Object>} Objeto con los datos de la lista (id, name, createdAt, items).
*/

const getList = async (listName) => {
  console.log("GET LIST")
  try {
    const listRef = db.ref('lists');
    const snapshot = await listRef.orderByChild('name').equalTo(listName).once('value');
    
    if (!snapshot.exists()) { throw new Error('La lista no existe'); }

    const listKey = Object.keys(snapshot.val())[0];
    const listData = snapshot.val()[listKey];

    const listFull = {
      id: listKey,
      name: listData.name,
      createdAt: listData.createdAt,
      items: listData.items || [] 
    }

    console.log(listFull);
    return listFull;

  } catch (error) {
    console.error("Error en la función getList:", error.message);
    throw error;
  }
}


// Añadir item (pendiente a cambios en el tipo de item)
/**
 * Agrega un ítem a una lista existente.
 * @function addItemToList
 * @param {string} listName - Nombre de la lista a actualizar.
 * @param {string|Object} item - Ítem a agregar (puede ser texto o un objeto más complejo).
 * @returns {Promise<string>} Mensaje de éxito al agregar el ítem.
 */
const addItemToList = async (listName, item) => {
  console.log("ADD ITEM TO LIST")
  try {
    const listRef = db.ref('lists');
    const snapshot = await listRef.orderByChild('name').equalTo(listName).once('value');
    
    if (!snapshot.exists()) { throw new Error('La lista no existe'); }

    const listKey = Object.keys(snapshot.val())[0]; 
    const listItemsRef = listRef.child(listKey).child('items'); 
    await listItemsRef.push(item);

    console.log(`Elemento agregado a la lista con ID ${listName}`);
    return `Elemento agregado a la lista ${listName} exitosamente.`;
  } catch (error) {
    console.error('Error al agregar el item a la lista:', error.message);
    throw error;
  }
}


/**
 * Elimina una lista existente por su nombre.
 * @function deleteList
 * @param {string} listName - Nombre de la lista a eliminar.
 * @returns {Promise<string>} Mensaje de éxito al eliminar la lista.
 */
const deleteList = async (listName) => {
  console.log("DELETE LIST")
  try {
    const listRef = db.ref('lists');
    const snapshot = await listRef.orderByChild('name').equalTo(listName).once('value');
    
    if (!snapshot.exists()) { throw new Error('La lista no existe'); }

    const listKey = Object.keys(snapshot.val())[0];
    await listRef.child(listKey).remove();

    console.log(`Lista '${listName}' eliminada exitosamente`);
    return `Lista '${listName}' eliminada exitosamente`;
  } catch (error) {
    console.error("Error en la función removeList:", error.message);
    throw error;
  }
}


/**
 * Elimina un ítem específico de una lista.
 * @function removeItemFromList
 * @param {string} listName - Nombre de la lista que contiene el ítem.
 * @param {string|Object} item - Ítem a eliminar (puede ser texto o un objeto más complejo).
 * @returns {Promise<string>} Mensaje de éxito al eliminar el ítem.
 */
const removeItemFromList = async (listName, item) => {
  console.log("REMOVE ITEM FROM LIST")
  try {
    const listRef = db.ref('lists');
    const snapshot = await listRef.orderByChild('name').equalTo(listName).once('value');
    
    if (!snapshot.exists()) { throw new Error('La lista no existe'); }

    const listKey = Object.keys(snapshot.val())[0];
    const listItemsRef = listRef.child(listKey).child('items');
    const itemsSnapshot = await listItemsRef.once('value');
    
    if (!itemsSnapshot.exists()) { throw new Error('No hay ítems en la lista'); }

    let itemToDelete = null;
    itemsSnapshot.forEach(childSnapshot => {
      if (childSnapshot.val() === item) { itemToDelete = childSnapshot.key; }
    });

    if (!itemToDelete) { throw new Error('El ítem no existe en la lista'); }
    await listItemsRef.child(itemToDelete).remove();

    console.log(`Ítem con valor '${item}' eliminado de la lista '${listName}'`);
    return `Ítem con valor '${item}' eliminado de la lista '${listName}'`;
  } catch (error) {
    console.error("Error en la función removeItemFromList:", error.message);
    throw error;
  }
}


module.exports = { createList, getList, addItemToList, deleteList, removeItemFromList }