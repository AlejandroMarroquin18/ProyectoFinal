const { createList, addItemToList, deleteList, getList, removeItemFromList } = require('../services/listService')

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