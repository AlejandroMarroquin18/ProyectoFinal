const { db } = require('../config/dbConfig')

// Creacion de lista para articulos del usuario
async function createList(listName) {
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
    console.error("Error en la función createList:", error);
    throw error;
  }
}


// Leer lista
async function getList(listName) {
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
    console.error("Error en la función getList:", error);
    throw error;
  }
}


// Añadir item (pendiente a cambios en el tipo de item)
async function addItemToList(listName, item) {
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
    console.error('Error al agregar el item a la lista:', error);
    throw error;
  }
}


// Eliminar lista
async function deleteList(listName) {
  try {
    const listRef = db.ref('lists');
    const snapshot = await listRef.orderByChild('name').equalTo(listName).once('value');
    
    if (!snapshot.exists()) { throw new Error('La lista no existe'); }

    const listKey = Object.keys(snapshot.val())[0];
    await listRef.child(listKey).remove();

    console.log(`Lista '${listName}' eliminada exitosamente`);
    return `Lista '${listName}' eliminada exitosamente`;
  } catch (error) {
    console.error("Error en la función removeList:", error);
    throw error;
  }
}


// Eliminar item
async function removeItemFromList(listName, item) {
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
    console.error("Error en la función removeItemFromList:", error);
    throw error;
  }
}


module.exports = { createList, getList, addItemToList, deleteList, removeItemFromList }